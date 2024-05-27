import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {
  const { t } = useTranslation("home");

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
                      <a href="/account/cards/new" className="btn btn-outline-primary smoothscroll">
                      {t("tryNow")}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="illustration">
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
