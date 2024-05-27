import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

async function refreshAccessToken(token) {
  try {
    const url = process.env.AZURE_AD_B2C_ENDPOINT + `token`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=refresh_token&client_secret=${process.env.AZURE_AD_B2C_CLIENT_SECRET}&refresh_token=${token.refreshToken}&client_id=${process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID}`,
    });

    const refreshedTokens = (await response.json());

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      idToken: refreshedTokens.id_token,
      idTokenExpires: Date.now() + 3595000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      authorization: {
        params: {
          scope: process.env.AZURE_AD_B2C_SCOPES
        },
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account) {
        token.accessToken = account.id_token
        token.refreshToken = account.refresh_token
      }

      if (token.idTokenExpires && Date.now() < token.idTokenExpires) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    secret: process.env.NEXTAUTH_SECRET
  },
});

