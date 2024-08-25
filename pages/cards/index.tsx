import Head from "next/head";
import { format } from "@/stringUtils";
import Link from "next/link";
import { Game, GameFormModel } from "@/Game";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import router from "next/router";
import { AppContextModel } from "@/appContextProvider";
import { GetStaticPaths, GetStaticProps } from "next";

const Cards = ({ context }: { context: AppContextModel}) => {

  const [games, setGames] = useState([] as GameFormModel[]);
  const [canAdd, setCanAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [imageSources, setImageSources] = useState<string[]>(
    games.map((game) => `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${game.image}`)
  );

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch("/api/games");
      if (response.ok) {
        const gamesResponse = await response.json() as GameFormModel[];
          setGames(gamesResponse);
          setImageSources(gamesResponse.map((game) => `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${game.image}`))
      }
    }
    fetchGames();
  }, []);

  const handleImageError = (index: number) => {
    setImageSources((prev) => {
      const newSources = [...prev];
      newSources[index] = `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/images/games/placeholder.webp`;
      return newSources;
    });
  };

  const addNew = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const response = await fetch('/api/games', {
        method: 'PUT',
        body: "{}"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      var json = await response.json();
      var game = json as GameFormModel;

      toast.success('New card added!');
      router.push('/cards/' + game.rowKey);
    } catch (error) {
      toast.error('Card failed to add!, ' + error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <Head>
        <title>{format("Your cards", [context?.user?.clientPrincipal?.userDetails])}</title>
      </Head>
      <div className="untree_co-section">
        <div className="container mt-5 mt-lg-1">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h2 className="heading">Your cards.</h2>
              <p>All your cards, old and new. New cards are first then ordered by last edited.</p>
              <button disabled={canAdd} type="submit" onClick={(e) => addNew(e)} className="ml-1 btn btn-success">
                {!isAdding && <span>Add new</span>}
                {isAdding &&
                  <>
                    <span>Adding new... </span>
                    <div className="spinner-grow spinner-grow-sm text-light" role="status">
                      <span className="sr-only">Adding new...</span>
                    </div>
                  </>}
              </button>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <div className="row row-cols-1 row-cols-lg-4 row-cols-2 g-4" id="card-list">
                {games?.map((game, index) => (
                  <div className="col" key={game.rowKey}>
                    <Link href={`/cards/${game.rowKey}`}>
                      <div className="card shadow">
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Cards;
