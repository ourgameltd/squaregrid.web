import "bootstrap/dist/css/bootstrap.css";
import "../public/scss/style.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { appWithTranslation } from "next-i18next";
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SessionProvider } from "next-auth/react";

const SquareGridApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { t } = useTranslation(["navbar"]);

  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <AppContext.Consumer>
          {(context) => (
            <>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              </Head>
              <Navbar t={t} />
              <Component {...pageProps} context={context} />
            </>
          )}
        </AppContext.Consumer>
      </AppContextProvider>
    </SessionProvider>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["navbar"])),
  },
});

export default appWithTranslation(SquareGridApp);
