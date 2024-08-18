import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { format } from "@/stringUtils";
import { fetchData } from "@/api";
import { useRef, useState } from "react";
import { ClaimFormModel, Game, GameFormModel } from "@/Game";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Block } from "@/Block";

interface CardProps {
  game: Game
}

const Card = ({ game }: CardProps) => {
  const { t } = useTranslation(["card", "common", "navbar"]);
  const [imgSrc, setImgSrc] = useState(game.image);
  const [isClaiming, setIsClaiming] = useState(false);

  const [gameData, setGameData] = useState(game);
  const [blocks, setBlocks] = useState(game?.blocks?.sort((a, b) => a.index - b.index));

  const inputRef = useRef<HTMLInputElement>(null);

  const { setError, clearErrors, formState: { errors } } = useForm<ClaimFormModel>({
    defaultValues: {} as ClaimFormModel,
  });

  function claim(e: React.FormEvent, updatedBlock: Block): void {
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

    updatedBlock.claimedByFriendlyName = inputValue;
    updatedBlock.dateClaimed = new Date();
    updatedBlock.isClaimed = true;

    try {
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
      toast.success('Failed to claim cell!, ' + error);
    } finally {
      setIsClaiming(false);
    }
  }

  return (
    <>
      <Head>
        <title>{format(t("pageTitle"), [gameData?.title])}</title>
      </Head>
      <ToastContainer />
      <div className="untree_co-hero pb-0 pt-0" id="game-section">
        <div className={game.displayAsGrid ? "container-fluid" : "container"}>
          <div className="row pb-0 pt-3">
            <div className="col-12">
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
            </div>
          </div>
          <div className="row pb-0 pt-3">
            <div className="col-12">
              <div className="form-group text-center">
                <label htmlFor="options" className="text-black fw-bold">What is your name?*</label>
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
            </div>
          </div>
          {!game.displayAsGrid &&
            <div className="row pb-0 pt-3">
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
                    <li key={block.index} className="list-group-item fs-6">
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
                            <button onClick={(e) => claim(e, block)} disabled={block.isClaimed} role="button" className="btn-primary btn btn-smaller float-end">
                            {block.isClaimed ? "Claimed" : "Claim"}
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
            <div className="row square-row pb-0 pt-3">
              {blocks?.map((block) => (
                <div key={block.index} className="col-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1">
                  <div className="square text-center">
                    <span className="text-truncate d-block">{block.index}. {block.title}</span>
                    {block.isClaimed &&
                    <div>
                      <span className="cursive text-truncate d-block">{block?.claimedByFriendlyName}</span>
                    </div>}
                    {!block.isClaimed &&
                    <div>
                      <button onClick={(e) => claim(e, block)} disabled={block.isClaimed} role="button" className="btn-primary btn">
                        {block.isClaimed ? "Claimed" : "Claim"}
                      </button>
                    </div>}
                  </div>
                </div>
              ))}
            </div>}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { groupName, shortName } = context.params as { groupName: string, shortName: string };
  let game: Game = {} as Game;

  try {
    game = await fetchData<Game>(`games/${groupName}/${shortName}`, context);
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

