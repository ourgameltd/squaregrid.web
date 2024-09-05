import Head from "next/head";
import { format } from "@/stringUtils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GameForm from "@/forms/GameForm";
import { GameFormModel } from "@/Game";
import GameBlocks from "@/forms/GameBlocks";
import { FieldErrors, useForm, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormWatch } from "react-hook-form";
import { Block } from "@/Block";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import GamePublish from "@/forms/GamePublish";
import GameWin from "@/forms/GameWin";

interface GameProps {
  game: GameFormModel;
}

export interface GameComponentProps extends GameProps {
  register: UseFormRegister<GameFormModel>;
  errors: FieldErrors<GameFormModel>;
  clearError: UseFormClearErrors<GameFormModel>;
  setError: UseFormSetError<GameFormModel>;
  blocks: Block[];
  setBlocks: Dispatch<SetStateAction<Block[]>>;
  imgSrc: string | undefined;
  setImgSrc: Dispatch<SetStateAction<string | undefined>>;
  watch: UseFormWatch<GameFormModel>;
}

const Card = () => {
  const router = useRouter();
  const { cardId } = router.query;

  const game = {} as GameFormModel;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [canDraw, setCanDraw] = useState(false);
  const [isSavingWinner, setIsSavingWinner] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [imgSrc, setImgSrc] = useState(game.image);
  const [gameTitle, setGameTitle] = useState("Loading...");
  const [blocks, setBlocks] = useState(game?.blocks?.sort((a, b) => a.index - b.index));

  const [blockCount, setBlockCount] = useState<number>(0);
  const [claimedBlockCount, setClaimedBlockCount] = useState<number>(0);
  const [percentageClaimed, setPercentageClaimed] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
    watch
  } = useForm<GameFormModel>({
    defaultValues: game,
  });

  let confirmedWinnerOnly = watch("confirmedWinnersOnly")

  useEffect(() => {
    setBlockCount(blocks?.length);

    const claimedCount = blocks?.filter((block) => block.isClaimed)?.length;
    setClaimedBlockCount(claimedCount);

    const percentage = blocks?.length > 0 ? (claimedCount / blocks?.length) * 100 : 0;
    setPercentageClaimed(Math.floor(percentage));
  }, [blocks, setBlocks]);

  useEffect(() => {
    reset(gameData);
  }, [gameData, reset]);

  useEffect(() => {
    if (!cardId) return;

    async function fetchGame() {
      setIsLoading(true);

      try {
        const response = await fetch("/api/games/" + cardId);
        if (response.ok) {
          const gamesResponse = (await response.json()) as GameFormModel;
          setGameData(gamesResponse);
          setGameTitle(gamesResponse.title);
          setImgSrc(gamesResponse.image);
          setBlocks(gamesResponse.blocks?.sort((a, b) => a.index - b.index));
        }
      } catch (error) {
        toast.error("Failed finding game");
      } finally {
        setIsLoading(false);
      }
    }
    fetchGame();
  }, [cardId]);

  useEffect(() => {
    if (gameData.percentageClaimed <= 0) {
      setCanDraw(false);
      return;
    }

    if (confirmedWinnerOnly && blocks?.filter((i) => i.isClaimed && i.isConfirmed).length <= 0) {
      setCanDraw(false);
      return;
    }

    if (!confirmedWinnerOnly && blocks?.filter((i) => i.isClaimed).length <= 0) {
      return;
    }

    setCanDraw(true);
  }, [gameData, blocks, confirmedWinnerOnly]);

  const onSubmit = async (data: GameFormModel) => {
    setIsSaving(true);
    const formData = { ...data, blocks };

    const form = new FormData();
    if (data && data.imageUpload.length > 0) {
      form.append("file", data.imageUpload[0]);
    }
    form.append("json", JSON.stringify(formData));

    try {
      const response = await fetch("/api/games/" + gameData.rowKey, {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        toast.error("Card failed to save!, " + (await response.text()));
      } else {
        setGameData(formData);
        setGameTitle(formData.title);
        toast.success("Card saved successfully!");
      }
    } catch (error) {
      toast.error("Card failed to save!, " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const drawWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWinner(true);

    try {
      const response = await fetch("/api/games/" + gameData.rowKey + "/winner?confirmedWinnerOnly=" + gameData.confirmedWinnersOnly, {
        method: "POST",
        body: "{}",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      var json = await response.json();
      var formData = json as GameFormModel;

      setGameData(formData);
      setBlocks(formData.blocks.sort((a, b) => a.index - b.index));

      toast.success("Card saved successfully!");
    } catch (error) {
      toast.error("Card failed to save!, " + error);
    } finally {
      setIsSavingWinner(false);
    }
  };

  return (
    <>
      <Head>
        <title>{format("Edit card '{0}'", [gameTitle])}</title>
      </Head>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="text-muted mt-2">Loading</div>
          </div>
        </div>
      )}
      <ToastContainer />
      {!isLoading && (
        <div className="untree_co-section">
          <div className="container mt-lg-1">
            <div className="row">
              <div className="col-12 text-center my-3">
                <h2 className="heading">{format("Edit card {0}.", [gameTitle])}</h2>
                <p>Add your title, description, blocks and image, then add values in the bottom to publish the card publicly. Once its drawn it cant be edited.</p>
              </div>
              <div className="col-12">
                {!gameData.isWon && (
                  <div className="progress">
                    <div
                      className={"progress-bar progress-bar-striped bg-" + (percentageClaimed == 100 ? "success" : "primary")}
                      role="progressbar"
                      style={{ width: `${percentageClaimed}%` }}
                      aria-valuenow={claimedBlockCount}
                      aria-valuemin={0}
                      aria-valuemax={blockCount}
                    >
                      <span className="px-2 font-weight-bold text-white">
                        {percentageClaimed}% complete {blockCount > 0 && <span>({blockCount - claimedBlockCount} remaining)</span>}
                      </span>
                    </div>
                  </div>
                )}
                {gameData.isWon && (
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-striped bg-warning"
                      role="progressbar"
                      style={{ width: `100%` }}
                      aria-valuenow={blockCount}
                      aria-valuemin={0}
                      aria-valuemax={blockCount}
                    >
                      <span className="px-2 font-weight-bold text-black">
                        Won by <span>{gameData.wonByName}</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-12 bg-white py-4 rounded">
              <ul className="nav nav-tabs" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-info-tab" data-toggle="pill" href="#pills-info" role="tab" aria-controls="pills-info" aria-selected="true">
                    <i className="bi bi-info-square"></i> <span className="d-none d-md-inline-block">1. Info</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-blocks-tab" data-toggle="pill" href="#pills-blocks" role="tab" aria-controls="pills-blocks" aria-selected="false">
                    <i className="bi bi-grid-3x3"></i> <span className="d-none d-md-inline-block">2. Squares</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-share-tab" data-toggle="pill" href="#pills-share" role="tab" aria-controls="pills-share" aria-selected="false">
                    <i className="bi bi-share"></i> <span className="d-none d-md-inline-block">3. Share</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-win-tab" data-toggle="pill" href="#pills-win" role="tab" aria-controls="pills-win" aria-selected="false">
                    <i className="bi bi-award"></i> <span className="d-none d-md-inline-block">4. Win</span>
                  </a>
                </li>
              </ul>
              <form onSubmit={handleSubmit(onSubmit)} className="card-form p-3">
                <input type="hidden" id="partitionKey" {...register("partitionKey", { required: true })} />
                <input type="hidden" id="rowKey" {...register("rowKey", { required: true })} />
                <input type="hidden" id="eTag" {...register("eTag", { required: true })} />

                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab">
                    <GameForm
                      setImgSrc={setImgSrc}
                      imgSrc={imgSrc}
                      register={register}
                      errors={errors}
                      game={gameData}
                      setError={setError}
                      clearError={clearErrors}
                      blocks={blocks}
                      setBlocks={setBlocks}
                      watch={watch}
                    ></GameForm>
                  </div>
                  <div className="tab-pane fade" id="pills-blocks" role="tabpanel" aria-labelledby="pills-blocks-tab">
                    <GameBlocks
                      setImgSrc={setImgSrc}
                      imgSrc={imgSrc}
                      register={register}
                      errors={errors}
                      game={gameData}
                      setError={setError}
                      clearError={clearErrors}
                      blocks={blocks}
                      setBlocks={setBlocks}
                      watch={watch}
                    ></GameBlocks>
                  </div>
                  <div className="tab-pane fade" id="pills-share" role="tabpanel" aria-labelledby="pills-share-tab">
                    <GamePublish
                      setImgSrc={setImgSrc}
                      imgSrc={imgSrc}
                      register={register}
                      errors={errors}
                      game={gameData}
                      setError={setError}
                      clearError={clearErrors}
                      blocks={blocks}
                      setBlocks={setBlocks}
                      watch={watch}
                    ></GamePublish>
                  </div>
                  <div className="tab-pane fade" id="pills-win" role="tabpanel" aria-labelledby="pills-win-tab">
                    <GameWin
                      setImgSrc={setImgSrc}
                      imgSrc={imgSrc}
                      register={register}
                      errors={errors}
                      game={gameData}
                      setError={setError}
                      clearError={clearErrors}
                      blocks={blocks}
                      setBlocks={setBlocks}
                      watch={watch}
                      drawWinner={drawWinner}
                      canDraw={canDraw}
                      isSavingWinner={isSavingWinner}
                    ></GameWin>
                  </div>
                </div>
                <div className="form-group mb-0 text-right">
                  <button disabled={gameData.isWon || isSaving} type="submit" className="btn btn-primary">
                    {!isSaving && <span>Save </span>}
                    {isSaving && (
                      <>
                        <span>Saving... </span>
                        <div className="spinner-grow spinner-grow-sm text-light" role="status">
                          <span className="sr-only">Saving...</span>
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
