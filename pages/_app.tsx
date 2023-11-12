"use client";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { ITranslatable, Translatable } from "../utils/Translatable";
import Head from "next/head";
import { useTranslation } from "next-export-i18n";
import AppContextProvider from "../contexts/appContextProvider";
import AppContext from "../contexts/appContext";

export class BreadcrumbLang implements ITranslatable {
  Dashboard: string = "";
  DashboardView: string = "";
}

export class AppResourcesLang implements ITranslatable {
  PageTitle: string = "";
  AppName: string = "";
  SignOut: string = "";
}

export default function OurGameApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();

  const [breadcrumbLang, setBreadcrumbLang] = useState<BreadcrumbLang>(new BreadcrumbLang());
  const [appResources, setAppResources] = useState<AppResourcesLang>(new AppResourcesLang());

  useEffect(() => {
    setBreadcrumbLang(Translatable<BreadcrumbLang>(breadcrumbLang, t, "BreadCrumb"));
    setAppResources(Translatable<AppResourcesLang>(appResources, t, "AppResources"));
  }, []);

  useEffect(() => {
  }, []);
  return (
    <AppContextProvider>
      <AppContext.Consumer>
        {context =>
          <>
            <Head>
              <title>{appResources.PageTitle}</title>
            </Head>
            <Navbar />
            <Component {...pageProps}
                context={context}
                breadcrumbLang={breadcrumbLang}
                translation={t}
                appResources={appResources} />
          </>
        }
      </AppContext.Consumer>
    </AppContextProvider>
  );
}
