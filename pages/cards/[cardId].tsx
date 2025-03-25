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
import GameWin from "@/forms/GameWin";
import Link from "next/link";

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

    if (gameData.confirmedWinnersOnly && blocks?.filter((i) => i.isClaimed && i.isConfirmed).length <= 0) {
      setCanDraw(false);
      return;
    }

    if (!gameData.confirmedWinnersOnly && blocks?.filter((i) => i.isClaimed).length <= 0) {
      return;
    }

    setCanDraw(true);
  }, [gameData, blocks]);

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

  const renderSave = (marginBottom: number = 4) => {
    return <div className={`col-12 mt-4 mb-${marginBottom} text-center`}>
      <button disabled={gameData.isWon || isSaving} type="submit" className="btn btn-primary mr-2">
        {!isSaving &&
          <>
            <span>Save </span> <i className="bi bi-save"></i>
          </>}
        {isSaving &&
          <>
            <span>Saving... </span>
            <div className="spinner-grow spinner-grow-sm text-light" role="status">
              <span className="sr-only">Saving...</span>
            </div>
          </>
        }
      </button>
      <Link className="btn btn-danger" href="/cards">
        Exit <i className="bi bi-box-arrow-left"></i>
      </Link>
    </div>
  };

  return (
    <>
      <Head>
        <title>{format("Edit card '{0}'", [gameTitle])}</title>
      </Head>
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <div className="spinner-grow text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="text-muted mt-2">Loading</div>
          </div>
        </div>
      )}
      <ToastContainer />
      {!isLoading && (
        <div className="untree_co-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="jumbotron jumbotron-fluid bg-transparent py-0">
                  <h2 className="display-5">{format("Edit - {0}", [gameTitle])}</h2>
                  <p className="lead">Comeplete the form, select a layout with it's options and share to social media, when ready pick your winner.</p>
                  <div>
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
              </div>
            </div>
              <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row bg-white rounded mx-1">
                <input type="hidden" id="partitionKey" {...register("partitionKey", { required: true })} />
                <input type="hidden" id="rowKey" {...register("rowKey", { required: true })} />
                <input type="hidden" id="eTag" {...register("eTag", { required: true })} />
                {renderSave(0)}
                <header className="col-12 my-4">
                  <p className="h4 m-0">Details <i className="bi bi-share"></i></p>
                  <hr className="m-0"></hr>
                </header>
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
                <header className="col-12 my-4">
                  <p className="h4 m-0">Options <i className="bi bi-grid-3x3"></i></p>
                  <hr className="m-0"></hr>
                </header>
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
                <header className="col-12 my-4">
                  <p className="h4 m-0">Win <i className="bi bi-award"></i></p>
                  <hr className="m-0"></hr>
                </header>
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
                {renderSave()}
            </div>
              </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
