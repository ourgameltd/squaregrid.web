import Head from "next/head";
import styles from "./index.module.css";
import { useTranslation } from 'next-i18next'
import { useEffect } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Home = () => {
  const { t, i18n } = useTranslation('home', { bindI18n: 'languageChanged loaded' })

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ['home'])
  }, [])

  return (
    <>
    <Head>
        <title>{t('pageTitle')}</title>
    </Head>
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Found <span className={styles.code}>{0}</span> association staff types
        </p>
      </div>
    </main>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...await serverSideTranslations(locale, 'home'),
  },
})

export default Home