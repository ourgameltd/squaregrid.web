import Head from "next/head";
import { format } from "@/stringUtils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameForm from "@/forms/GameForm";
import { GameFormModel } from "@/Game";
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

const Card = () => {
  // Get the game form data
  const game = {} as GameFormModel;
  
  const [isSaving, setIsSaving] = useState(false);
  const [canDraw, setCanDraw] = useState(false);
  const [isSavingWinner, setIsSavingWinner] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [gameTitle, setGameTitle] = useState(gameData.title);
  const [blocks, setBlocks] = useState(game?.blocks?.sort((a, b) => a.index - b.index));

  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<GameFormModel>({
    defaultValues: game,
  });

  useEffect(() => {
    if (gameData.percentageClaimed <= 0) {
      setCanDraw(false);
      return;
    }
  
    if (gameData.confirmedWinnersOnly && blocks.filter(i => i.isClaimed && i.isConfirmed).length <= 0) {
      setCanDraw(false);
      return;
    }

    if (!gameData.confirmedWinnersOnly && blocks.filter(i => i.isClaimed).length <= 0) {
      return;
    }

    setCanDraw(true);
  }, [gameData, blocks])

  const onSubmit = async (data: GameFormModel) => {
    setIsSaving(true);
    const formData = { ...data, blocks };

    const form = new FormData();
    if (data && data.imageUpload.length > 0) {
      form.append('file', data.imageUpload[0]);
    }
    form.append('json', JSON.stringify(formData));

    try {
      const response = await fetch('/api/games/' + gameData.rowKey, {
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
      toast.error('Card failed to save!, ' + error);
    } finally {
      setIsSaving(false);
    }
  };

  const drawWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWinner(true);

    try {
      const response = await fetch('/api/games/' + gameData.rowKey + '/winner?confirmedWinnerOnly=' + gameData.confirmedWinnersOnly, {
        method: 'POST',
        body: "{}"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      var json = await response.json();
      var formData = json as GameFormModel;

      setGameData(formData);
      setBlocks(formData.blocks.sort((a, b) => a.index - b.index));

      toast.success('Card saved successfully!');
    } catch (error) {
      toast.error('Card failed to save!, ' + error);
    } finally {
      setIsSavingWinner(false);
    }
  };

  return (
    <>
      <Head>
        <title>{format("Edit card '{0}'", [gameTitle])}</title>
      </Head>
      <ToastContainer />
      <div className="untree_co-section">
        <div className="container mt-5 mt-lg-1">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="heading">{format('Edit card {0}.', [gameTitle])}</h2>
              <p>Add your tirle, description, blocks and image, then add values in the bottom to publish the card publicly. Once its drawn it cant be edited.</p>
              {!gameData.isWon &&
                <button disabled={!canDraw} type="submit" onClick={(e) => drawWinner(e)} className="ml-1 btn btn-warning">
                  {!isSavingWinner && <span>Draw winner </span>}
                  {isSavingWinner &&
                    <>
                      <span>Saving... </span>
                      <div className="spinner-grow spinner-grow-sm text-light" role="status">
                        <span className="sr-only">Drawing winner...</span>
                      </div>
                    </>}
                </button>}
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-5">
              <div className="col-md-6">
                <GameForm register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors} blocks={blocks} setBlocks={setBlocks}></GameForm>
              </div>
              <div className="col-md-6 mt-4 mt-lg-0">
                <GameBlocks register={register} errors={errors} game={gameData} setError={setError} clearError={clearErrors} blocks={blocks} setBlocks={setBlocks}></GameBlocks>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group mt-3">
                  <button disabled={gameData.isWon || isSaving} type="submit" className="btn btn-primary">
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

export default Card;

