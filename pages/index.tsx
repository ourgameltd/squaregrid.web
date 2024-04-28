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
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="dots"></div>
              <div className="row justify-content-center">
                <div className="col-md-7 text-center mb-5">
                  <h1 className="heading" data-aos="fade-up" data-aos-delay="0">
                    Free Bootstrap 4 Landing Page for SaaS Websites{" "}
                    <span className="d-block">
                      by <a href="https://untree.co">Untree.co</a>
                    </span>
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="intro">
                    <div className="excerpt" data-aos="fade-up" data-aos-delay="100">
                      <span className="caption">Welcome to landing</span>
                      <h2 className="font-weight-bold">Explore The Platform</h2>
                      <p>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove
                        right at the coast
                      </p>
                    </div>
                    <p data-aos="fade-up" data-aos-delay="200">
                      <a href="#features-section" className="btn btn-primary smoothscroll mr-1">
                        See Features
                      </a>
                      <a href="#pricing-section" className="btn btn-outline-primary smoothscroll">
                        Pricing
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="illustration">
                    <img src="images/graphs-statistics_outline.svg" alt="Image" className="img-fluid" />
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, "home")),
  },
});

export default Home;
