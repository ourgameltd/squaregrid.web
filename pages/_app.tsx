import "bootstrap-icons/font/bootstrap-icons.css";
import "../public/scss/style.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";
import Head from "next/head";

const SquareGridApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {(context) => (
          <>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>
            <Navbar context={context} />
            <Component {...pageProps} context={context} />
          </>
        )}
      </AppContext.Consumer>
    </AppContextProvider>
  );
};

export default SquareGridApp;
