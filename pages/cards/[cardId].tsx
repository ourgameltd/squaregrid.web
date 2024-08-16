import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { fetchData } from "@/api";
import { useState } from "react";
import GameForm from "@/forms/GameForm";
import { Game, GameFormModel } from "@/Game";
import GameBlocks from "@/forms/GameBlocks";
import { FieldErrors, useForm, UseFormClearErrors, UseFormRegister, UseFormSetError } from "react-hook-form";

interface GameProps {
  game: GameFormModel
}

export interface GameComponentProps extends GameProps {
  register: UseFormRegister<GameFormModel>,
  errors: FieldErrors<GameFormModel>,
  clearError: UseFormClearErrors<GameFormModel>,
  setError: UseFormSetError<GameFormModel>,
}

const Card = ({ game }: GameProps) => {
  const { t } = useTranslation(["card", "common", "navbar"]);

  const [gameData, setGameData] = useState(game);
  const [gameTitle, setGameTitle] = useState(game.title);

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<GameFormModel>({
    defaultValues: game,
  });

  const onSubmit = (data: GameFormModel) => {
    console.log(data);
    setGameData(data);
    setGameTitle(data.title);
  };

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [gameTitle])}</title>
      </Head>
      <div className="untree_co-section">
        <div className="container">
          <div className="row mt-xs-5">
            <div className="col-12 text-center">
              <h2 className="heading">{format(t("card:title"), [gameTitle])}</h2>
              <p>{t("card:subTitle")}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-5">
              <div className="col-md-6">
                <GameForm register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors}></GameForm>
              </div>
              <div className="col-md-6">
                <GameBlocks register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors}></GameBlocks>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mt-3">
                  <button disabled={game.isWon} type="submit" className="btn btn-primary">Save</button>
                </div>
              </div>
            </div>
          </form>
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

