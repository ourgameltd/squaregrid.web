import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

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
  ]
});