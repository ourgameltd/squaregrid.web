import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
  const { t, i18n } = useTranslation("home", { bindI18n: "languageChanged loaded" });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["home"]);
  }, []);

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <main></main>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, "home")),
  },
});

export default Home;
