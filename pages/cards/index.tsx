import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { useSession } from "next-auth/react";
import { fetchData } from "@/api";
import Link from "next/link";
import { Game } from "@/Game";
import Image from 'next/image';
import { useState } from "react";
import Navbar from "@/navbar";

interface AccountProps {
  games: Game[];
}

const Cards = ({ games }: AccountProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation(["account", "common", "navbar"]);

  const [imageSources, setImageSources] = useState<string[]>(
    games.map((game) => `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${game.image}`)
  );

  const handleImageError = (index: number) => {
    setImageSources((prev) => {
      const newSources = [...prev];
      newSources[index] = '/images/games/placeholder.webp';
      return newSources;
    });
  };

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [session?.user?.name])}</title>
      </Head>
      <Navbar t={t} />
      <div className="untree_co-section">
        <div className="container mt-5 mt-lg-1">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="heading">{t("account:title")}</h2>
              <p>{t("account:subTitle")}</p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="row row-cols-1 row-cols-lg-4 row-cols-2 g-4" id="card-list">
                {games.map((game, index) => (
                  <div className="col">
                    <Link href={`/cards/${game.rowKey}`}>
                      <div className="card">
                        <div className="image-container">
                          <Image
                            src={imageSources[index]}
                            alt={"Image for game " + game?.title}
                            unoptimized={true}
                            layout="fill"
                            objectFit="cover"
                            className="card-img-top"
                            onError={() => handleImageError(index)}
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            {game.title}</h5>
                          <p className="card-text">{game.description}.</p>
                        </div>
                        <div className="card-footer">
                          <div className="progress">
                            <div className={"progress-bar bg-" + (game.isWon ? "warning" : game.isClaimed ? "success" : "primary")} role="progressbar" style={{ width: `${game?.percentageClaimed}%` }} aria-valuenow={game?.claimedBlockCount} aria-valuemin={0} aria-valuemax={game?.blockCount}></div>
                          </div>
                          <small className="text-muted">
                            {game?.isWon &&
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
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
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
