import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { useSession } from "next-auth/react";

const Account = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation("account", { bindI18n: "languageChanged loaded" });

  useEffect(() => {
    i18n.reloadResources(i18n.resolvedLanguage, ["account"]);
  }, []);

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [session?.user?.name])}</title>
      </Head>
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="caption">Account</span>
              <h2 className="heading">My Cards</h2>
              <p>All of your cards, completed or ongoing can be found here.</p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12 text-center">
              <table className="table">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Total count</td>
                    <td>Total claimed</td>
                    <td>Total confirmed</td>
                    <td>Is won?</td>
                    <td>Date won</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, "account")),
  },
});

export default Account;
