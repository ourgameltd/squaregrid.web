import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Navbar from "@/navbar";

const Home = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("home");

  const redirectToCards = (e: any) => {
    if (session != null) {
      return;
    }

    e.preventDefault();
    signIn("azure-ad-b2c", { callbackUrl: '/cards/new-card' })
  }

  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-md-7 text-center mb-5">
                  <h1 className="heading">
                    {t("headline")}
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="intro">
                    <div className="excerpt">
                      <span className="caption">{t("sub")}</span>
                      <h2 className="font-weight-bold">{t("subTitle")}</h2>
                      <p>
                        {t("subHeadline")}
                      </p>
                    </div>
                    <p>
                      <Link href="/cards" className="btn btn-primary smoothscroll" onClick={redirectToCards} >
                        {t("tryNow")}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="illustration shadow">
                    <img src="/images/sketch.svg" alt="Image" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, "home")),
  },
});

export default Home;
