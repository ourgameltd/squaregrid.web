"use client";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { appWithTranslation } from 'next-i18next'
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";

const OurGameApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {context =>
          <>
            <Navbar />
            <Component {...pageProps}
                context={context} />
          </>
        }
      </AppContext.Consumer>
    </AppContextProvider>
  );
}

export default appWithTranslation(OurGameApp)