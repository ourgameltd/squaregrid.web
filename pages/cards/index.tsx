import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { useSession } from "next-auth/react";
import { fetchData } from "@/api";
import Link from "next/link";

interface AccountProps {
  games: Game[];
}

const Cards = ({ games }: AccountProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation(["account", "common", "navbar"]);

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [session?.user?.name])}</title>
      </Head>
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <span className="caption">{t("common:account")}</span>
              <h2 className="heading">{t("account:title")}</h2>
              <p>{t("account:subTitle")}</p>
              <button className="btn btn-success">
                Add a new card <i className="bi bi-plus-circle"></i>
              </button>
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
                      <td><Link href={`/cards/${game.rowKey}`}>{game.title}</Link></td>
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
      ...(await serverSideTranslations(context.locale, ["account", "common", "navbar"])),
    },
  };
};

export default Cards;
