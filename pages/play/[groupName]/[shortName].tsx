import Head from "next/head";
import { format } from "@/stringUtils";
import { useEffect, useRef, useState } from "react";
import { ClaimFormModel, Game, GameFormModel } from "@/Game";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Block } from "@/Block";
import { useRouter } from "next/router";
import PlayListLayout from "@/play/PlayListLayout";
import PlayGridLayout from "@/play/PlayGridLayout";
import { AppContextModel } from "@/appContextProvider";
import PlayInfoModal from "@/play/modals/PlayInfoModal";

const Card = ({ context }: { context: AppContextModel }) => {
  const router = useRouter();
  const { groupName, shortName } = router.query;

  const game = {} as GameFormModel;

  const [imgSrc, setImgSrc] = useState(game.image);
  const [isLoading, setIsLoading] = useState(true);
  const [isClaiming, setIsClaiming] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [gameTitle, setGameTitle] = useState("Loading...");
  const [blocks, setBlocks] = useState(game?.blocks?.sort((a, b) => a.index - b.index));

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ClaimFormModel>({
    defaultValues: {} as ClaimFormModel,
  });

  useEffect(() => {
    if (!groupName || !shortName) return;

    async function fetchGame() {
      const response = await fetch("/api/lookup/" + groupName + "/" + shortName);
      if (response.ok) {
        const gamesResponse = (await response.json()) as GameFormModel;
        setGameData(gamesResponse);
        setGameTitle(gamesResponse.title);
        setImgSrc(gamesResponse.image);
        setBlocks(gamesResponse.blocks?.sort((a, b) => a.index - b.index));
      }
    }

    setIsLoading(true);
    try {
      fetchGame();
    } catch (error) {
      toast.error("Failed finding game");
    } finally {
      setIsLoading(false);
    }

    const interval = setInterval(() => {
      if (isClaiming) return;
      fetchGame();
    }, 30000);
  }, [groupName, shortName, isClaiming]);

  const claim = async (e: React.FormEvent, updatedBlock: Block) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value;

    if (!inputValue) {
      setError("claimedBy", {
        type: "manual",
        message: "Please enter your name to claim."
      });
      return;
    } else {
      clearErrors(["claimedBy"]);
    }

    setIsClaiming(true);

    try {
      var response = await fetch(`/api/claim/games/${updatedBlock.partitionKey}/block/${updatedBlock.rowKey}`, {
        method: "POST",
        body: JSON.stringify({
          claimedBy: inputValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      updatedBlock.claimedByFriendlyName = inputValue;
      updatedBlock.dateClaimed = new Date();
      updatedBlock.isClaimed = true;

      toast.success("Cell claimed successfully!");
      setBlocks((prevBlocks) => prevBlocks.map((block) => (block.rowKey === updatedBlock.rowKey ? updatedBlock : block)).sort((a, b) => a.index - b.index));
    } catch (error) {
      toast.error("Failed to claim cell, it may just have been claimed");
    } finally {
      setIsClaiming(false);
    }
  };

  const renderLayout = () => {
    switch (gameData.gridLayout) {
      case 'list':
        return <PlayListLayout game={gameData} blocks={blocks} claim={claim} sidebar={false}></PlayListLayout>;
      case 'listSidebar':
        return <PlayListLayout game={gameData} blocks={blocks} claim={claim} sidebar={true}></PlayListLayout>;
      case 'gridSidebar':
        return <PlayGridLayout game={gameData} blocks={blocks} claim={claim} sidebar={true}></PlayGridLayout>;
      default:
        return <PlayGridLayout game={gameData} blocks={blocks} claim={claim} sidebar={false}></PlayGridLayout>;
    }
  };

  const renderTitle = () => {
    if (!gameData.gridLayout?.includes('Sidebar')) {
      return <h2 title="Click to read more about this card" onClick={handleModalOpen}>{gameData?.title} <i className="bi bi-info-circle-fill text-primary"></i></h2>;
    } else {
      return <h2>{gameData?.title}</h2>;
    }
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title>{format("Play '{0}'", [gameTitle])}</title>
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
        <div className="untree_co-hero pb-3" id="game-section">
          <div className={(gameData.gridLayout?.includes("grid") || !gameData.gridLayout) ? "container-fluid" : "container"}>
            <div className="row pb-2 pt-2 text-left">
              <div className="col-md-8">
                {renderTitle()}
              </div>
              <div className="col-md-4">
                {!gameData.isWon && (
                  <>
                    <div className="input-group">
                      <input
                        type="text"
                        id="claimedBy"
                        className="form-control"
                        value={context?.user?.clientPrincipal?.userDetails}
                        placeholder="Enter your name or contact name."
                        aria-label="Enter your name or contact name."
                        aria-describedby="Enter your name or contact name"
                        ref={inputRef}
                      />
                    </div>
                    {errors.claimedBy && <span className="text-danger">{errors.claimedBy.message}</span>}
                  </>
                )}
                {gameData.isWon && (
                  <div className="form-group">
                    <label htmlFor="options" className="text-black fw-bold">
                      Winner
                    </label>
                    <div className="badge bg-warning text-dark d-block text-center">
                      <h4 className="m-0">{gameData.wonByName ?? ""}</h4>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {renderLayout()}
          </div>
        </div>
      )}
      {showModal && <PlayInfoModal game={gameData} show={true} onClose={handleModalClose} />}
    </>
  );
};

export default Card;
