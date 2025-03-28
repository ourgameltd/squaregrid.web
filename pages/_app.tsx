import "bootstrap-icons/font/bootstrap-icons.css";
import "../public/scss/style.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";
import Head from "next/head";
import { useRouter } from "next/router";

const SquareGridApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const router = useRouter();
  const hideNavbar = router.pathname === "/play/[groupName]/[shortName]";

  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {(context) => (
          <>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>
            {!hideNavbar && <Navbar context={context} />}
            <Component {...pageProps} context={context} />
            <Footer />
          </>
        )}
      </AppContext.Consumer>
    </AppContextProvider>
  );
};

export default SquareGridApp;
