import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { useSession } from "next-auth/react";
import { fetchData } from "@/api";
import Link from "next/link";
import { Game } from "@/Game";

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
              <h2 className="heading">{t("account:title")}</h2>
              <p>{t("account:subTitle")}</p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr className=" fw-bold">
                    <td style={{width: "25%"}}>Name</td>
                    <td style={{width: "50%"}}>Complete</td>
                    <td style={{width: "25%"}}>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.rowKey}>
                      <td style={{width: "25%"}} className="text-truncate"><Link style={{ display: "inline-block", maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} href={`/cards/${game.rowKey}`}>{game.title}</Link></td>
                      <td style={{width: "50%"}}>
                        <div className="progress">
                          <div className={"progress-bar bg-" + (game.isWon ? "warning" : game.isClaimed ? "success" : "primary")} role="progressbar" style={{width: `${game?.percentageClaimed}%`}} aria-valuenow={game?.claimedBlockCount} aria-valuemin={0} aria-valuemax={game?.blockCount}></div>
                        </div>
                      </td>
                      <td style={{width: "25%"}}>{game?.isWon &&
                        <div>
                          <i className="bi bi-trophy-fill text-warning"></i> <span>{game?.wonByName}</span>
                        </div>}
                        {(game?.isWon == false && game?.isClaimed) &&
                        <div>
                          <i className="bi bi-ticket-detailed text-success"></i> <span>full</span>
                        </div>}
                        {(game?.isWon == false && game?.isClaimed == false && game.percentageClaimed > 0) &&
                        <div>
                          <i className="bi bi-play text-primary"></i> <span>playing</span>
                        </div>}
                        {(game?.isWon == false && game?.isClaimed == false && game.percentageClaimed <= 0) &&
                        <div>
                          <i className="bi bi-alarm text-info"></i> <span>pending</span>
                        </div>}
                      </td>
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
