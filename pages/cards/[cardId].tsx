import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { fetchData } from "@/api";
import { Dispatch, SetStateAction, useState } from "react";
import GameForm from "@/forms/GameForm";
import { Game, GameFormModel } from "@/Game";
import GameBlocks from "@/forms/GameBlocks";
import { FieldErrors, useForm, UseFormClearErrors, UseFormRegister, UseFormSetError } from "react-hook-form";
import { Block } from "@/Block";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface GameProps {
  game: GameFormModel
}

export interface GameComponentProps extends GameProps {
  register: UseFormRegister<GameFormModel>,
  errors: FieldErrors<GameFormModel>,
  clearError: UseFormClearErrors<GameFormModel>,
  setError: UseFormSetError<GameFormModel>,
  blocks: Block[],
  setBlocks: Dispatch<SetStateAction<Block[]>>
}

const Card = ({ game }: GameProps) => {
  const { t } = useTranslation(["card", "common", "navbar"]);
  const [isSaving, setIsSaving] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [gameTitle, setGameTitle] = useState(game.title);
  const [blocks, setBlocks] = useState(game.blocks.sort((a, b) => a.index - b.index));

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<GameFormModel>({
    defaultValues: game,
  });

  const onSubmit = async (data: GameFormModel) => {
    setIsSaving(true);
    const formData = { ...data, blocks };

    const form = new FormData();
    if (data && data.imageUpload.length > 0) {
      form.append('file', data.imageUpload[0]);
    }
    form.append('json', JSON.stringify(formData));

    try {
      const response = await fetch('/api/game/' + game.rowKey, {
        method: 'POST',
        body: form
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      setGameData(formData);
      setGameTitle(formData.title);
      toast.success('Card saved successfully!');
    } catch (error) {
      toast.success('Card failed to save!, ' + error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [gameTitle])}</title>
      </Head>
      <ToastContainer />
      <div className="untree_co-section">
        <div className="container mt-5 mt-lg-1">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="heading">{format(t("card:title"), [gameTitle])}</h2>
              <p>{t("card:subTitle")}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-5">
              <div className="col-md-6">
                <GameForm register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors} blocks={blocks} setBlocks={setBlocks}></GameForm>
              </div>
              <div className="col-md-6">
                <GameBlocks register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors} blocks={blocks} setBlocks={setBlocks}></GameBlocks>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mt-3">
                  <button disabled={game.isWon || isSaving} type="submit" className="btn btn-primary">
                    {!isSaving && <span>Save </span>}
                    {isSaving && 
                      <>
                      <span>Saving... </span>
                      <div className="spinner-grow spinner-grow-sm text-light" role="status">
                        <span className="sr-only">Saving...</span>
                      </div>
                      </>}
                  </button>
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

