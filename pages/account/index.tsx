import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { useSession } from "next-auth/react";
import { fetchData } from "@/api";

interface AccountProps {
  games: Game[];
}

const Account = ({ games }: AccountProps) => {
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
                  {games.map((game) => (
                    <tr key={game.rowKey}>
                      <td>{game.title}</td>
                      <td>{game.blocks}</td>
                      <td>{game.blocksClaimed}</td>
                      <td>{game.blocksRemaining}</td>
                      <td>{game.isWon ? "Yes" : "No"}</td>
                      <td>{game.isWon ? new Date(game.timestamp).toLocaleDateString() : "N/A"}</td>
                    </tr>
                  ))}
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
  let games: Game[] = [];

  try {
    games = await fetchData<Game[]>('games', context);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      games, 
      ...(await serverSideTranslations(context.locale, "account")),
    },
  };
};

export default Account;
