import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../public/scss/style.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SquareGridApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const router = useRouter();
  
  useEffect(() => {
    const shouldRedirect = (path: string) => {
      const { pathname, asPath, route } = router;

      console.log(pathname);
      console.log(asPath);
      console.log(route);

      return path.toLowerCase().startsWith('/cards') || path.toLowerCase().startsWith('/play');
    };

    if (shouldRedirect(router.asPath)) {
      console.log("Redirecting because initial path is:", router.asPath);
    }
  }, []);
  
  return (
      <AppContextProvider>
        <AppContext.Consumer>
          {(context) => (
            <>
              <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              </Head>
              <Navbar context={context}/>
              <Component{...pageProps} context={context} />
            </>
          )}
        </AppContext.Consumer>
      </AppContextProvider>
  );
};

export default SquareGridApp;
