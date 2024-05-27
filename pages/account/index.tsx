import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { getSession, useSession } from "next-auth/react";
import { fetchData } from "@/api";
import { getToken } from "next-auth/jwt";

const Account = () => {
  const { data: session } = useSession();
  const { t } = useTranslation("account");
  
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
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Total count</td>
                    <td>Total claimed</td>
                    <td>Total confirmed</td>
                    <td>Is won?</td>
                    <td>Date won</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const response = await fetchData('games', context);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, "account")),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, "account")),
      },
    };
  }
};

export default Account;
