import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { fetchData } from "@/api";
import { Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import GameForm from "@/forms/GameForm";
import GameLayout from "@/forms/GameLayout";

interface GameProps {
  game: Game;
}

const Card = ({ game }: GameProps) => {
  const { t } = useTranslation(["card", "common", "navbar"]);

  const defaultKey: string = 'details'
  const [key, setKey] = useState(defaultKey);
  const [gameData, setGameData] = useState(game);

  const onSubmit = (data: Game) => {
    setGameData(data);
    console.log(gameData);
  };

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [gameData.title])}</title>
      </Head>
      <div className="untree_co-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="heading">{format(t("card:title"), [gameData.title])}</h2>
              <p>{t("card:subTitle")}</p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k || defaultKey)}
                className="mb-3"
              >
                <Tab eventKey={defaultKey} title="Details">
                  <GameForm onSubmit={onSubmit} game={gameData}></GameForm>
                </Tab>
                <Tab eventKey="card" title="Card">
                  <GameLayout game={gameData}></GameLayout>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { cardId } = context.params as { cardId: string };
  let game: Game = {} as Game;

  try {
    game = await fetchData<Game>(`games/${cardId}`, context);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      game,
      ...(await serverSideTranslations(context.locale, ["card", "common", "navbar"])),
    },
  };
};

export default Card;

