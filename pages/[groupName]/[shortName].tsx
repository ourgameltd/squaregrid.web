import Head from "next/head";
import { format } from "@/stringUtils";
import { useRef, useState } from "react";
import { ClaimFormModel, Game, GameFormModel } from "@/Game";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Block } from "@/Block";

const Card = () => {
  // Get the game form data
  const game = {} as GameFormModel;

  const [imgSrc, setImgSrc] = useState(game.image);
  const [isClaiming, setIsClaiming] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [blocks, setBlocks] = useState(game?.blocks?.sort((a, b) => a.index - b.index));

  const inputRef = useRef<HTMLInputElement>(null);

  const { setError, clearErrors, formState: { errors } } = useForm<ClaimFormModel>({
    defaultValues: {} as ClaimFormModel,
  });

  const claim = async (e: React.FormEvent, updatedBlock: Block) => {
    e.preventDefault();

    const inputValue = inputRef.current?.value;

    if (!inputValue) {
      setError('claimedBy', {
        type: "manual",
        message: "Please enter your name to claim.",
      });
      return;
    } else {
      clearErrors(['claimedBy']);
    }

    setIsClaiming(true);

    try {
      var response = await fetch(`/api/games/${updatedBlock.partitionKey}/block/${updatedBlock.rowKey}/claim`, {
        method: 'POST',
        body: JSON.stringify({
          claimedBy: inputValue
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      updatedBlock.claimedByFriendlyName = inputValue;
      updatedBlock.dateClaimed = new Date();
      updatedBlock.isClaimed = true;

      toast.success('Cell claimed successfully!');
      setBlocks((prevBlocks) =>
        prevBlocks
          .map((block) =>
            block.rowKey === updatedBlock.rowKey
              ? updatedBlock
              : block
          )
          .sort((a, b) => a.index - b.index));
    } catch (error) {
      toast.error('Failed to claim cell, it may just have been claimed');
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <>
      <Head>
        <title>{format('Play {0}', [gameData?.title])}</title>
      </Head>
      <ToastContainer />
      <div className="untree_co-hero pb-4" id="game-section">
        <div className="container">
          <div className="row pb-0 pt-3">
            <div className="col-xl-4">
              <div className="card">
                <div className="row">
                  <div className="col-md-4">
                    <div className="image-container">
                      <Image
                        src={imgSrc?.startsWith('blob:') ? imgSrc : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${imgSrc}`}
                        alt={"Image for game " + gameData?.title}
                        unoptimized={true}
                        layout="fill"
                        objectFit="cover"
                        className="img-fluid rounded-start"
                        onError={() => setImgSrc(`images/games/placeholder.webp`)}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{gameData?.title}</h5>
                      <p className="card-text">{gameData?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pb-3 pt-3">
                {!game.isWon &&
                  <div className="col-lg-6 col-xl-12">
                    <div className="form-group">
                      <label htmlFor="options" className="text-black fw-bold">Your name? *</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="claimedBy"
                          className="form-control"
                          placeholder="e.g. Michael"
                          aria-label="Your name."
                          aria-describedby="Your name"
                          ref={inputRef} />
                      </div>
                      {errors.claimedBy && <span className="text-danger">{errors.claimedBy.message}</span>}
                    </div>
                  </div>}
                {game.isWon &&
                  <div className="col-lg-6 col-xl-12">
                    <div className="form-group">
                      <label htmlFor="options" className="text-black fw-bold">Winner</label>
                      <div className="badge bg-warning text-dark d-block text-center">
                        <h4 className="m-0">{game.wonByName ?? ""}</h4>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
            <div className="col-xl-8">
              {!game.displayAsGrid &&
                <div className="row pb-0">
                  <div className="col-12">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <div className="container">
                          <div className="row text-left fw-bold">
                            <div className="col-5">
                              Title
                            </div>
                            <div className="col-7">
                              Claimed by
                            </div>
                          </div>
                        </div>
                      </li>
                      {blocks?.map((block) => (
                        <li key={block.index} className={"list-group-item fs-6 " + (block.isWinner ? "bg-warning" : "")}>
                          <div className="container">
                            <div className="row text-left">
                              <div className="col-5">
                                <span className="text-truncate d-block">
                                  {block.index}. {block.title}
                                </span>
                              </div>
                              <div className="col-5 fs-5">
                                <span className="cursive text-truncate d-block">{block?.claimedByFriendlyName}</span>
                              </div>
                              <div className="col-2">
                                <button onClick={(e) => claim(e, block)} disabled={block.isClaimed} role="button" className="btn-secondary btn btn-smaller float-end">
                                  Claim
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>}
              {game.displayAsGrid &&
                <div className="row square-row pb-0 px-2">
                  {blocks?.map((block) => (
                    <div key={block.index} className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
                      <div className={"square text-center " + (block.isWinner ? "bg-warning text-black": "")}>
                        <span className={`text-truncate d-block bg-secondary is bg-gradient text-white`}>{block.index}. {block.title}</span>
                        {block.isClaimed &&
                          <div>
                            <span className="cursive text-truncate d-block">{block?.claimedByFriendlyName}</span>
                          </div>}
                        {!block.isClaimed &&
                          <div>
                            <button onClick={(e) => claim(e, block)} disabled={block.isClaimed} role="button" className="btn-secondary btn btn-smaller">
                              Claim
                            </button>
                          </div>}
                      </div>
                    </div>
                  ))}
                </div>}
            </div>
          </div>
        </div >
      </div >
    </>
  );
};

export default Card;

