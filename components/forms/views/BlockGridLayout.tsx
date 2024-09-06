import React from "react";
import Image from "next/image";
import { BlockOptionsComponentProps } from "./BlockListLayout";
import { withNewLines } from "@/stringUtils";

const BlockGridLayout: React.FC<BlockOptionsComponentProps> = ({ game, blocks, removeBlock, openEditModal, sidebar }) => {

  return (
    <div>
      <div className="row">
        {sidebar &&
          <div className="col-xl-4 pb-2">
            <div className="card">
              <div className="row pb-0 pl-0">
                {game?.image &&
                  <div className="col-md-12">
                    <div className="image-container">
                      <Image
                        src={game?.image?.startsWith("blob:") ? game?.image : `${process.env.NEXT_PUBLIC_MEDIA_ENDPOINT}/${game?.image}`}
                        alt={"Image for game " + game?.title}
                        unoptimized={true}
                        fill={true}
                        style={{ objectFit: "cover" }}
                        priority={true}
                        className="img-fluid rounded-start"
                      />
                    </div>
                  </div>}
                <div className="col-md-12">
                  <div className="card-body">
                    <h5 className="card-title">{game?.title}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: withNewLines(game?.description) }}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        <div className={sidebar ? "col-xl-8" : "col-xl-12"}>
          <div className="row square-row pb-0 px-3">
            {blocks?.map((block) => (
              <div key={block.index} className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
                <div className={"square text-center " + (block.isWinner ? "bg-warning text-black" : "")}>
                  <span className="text-truncate d-block bg-secondary is bg-gradient text-white px-1">
                    {block.index}. {block.title}
                  </span>
                  {block.isClaimed && (
                    <div>
                      <span className="cursive text-truncate">{block?.claimedByFriendlyName}</span>
                    </div>
                  )}
                  {!block.isClaimed && (
                    <div>
                      <span className="cursive text-truncate d-block">&nbsp;</span>
                    </div>
                  )}
                  <div className="pb-2">
                    {!game.isWon && (
                      <button
                        disabled={game.isWon}
                        title="Delete this square altogether."
                        className="btn btn-sm btn-danger ml-1 float-end"
                        role="button"
                        onClick={(e) => removeBlock(block.partitionKey, block.rowKey, e)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    )}
                    {!game.isWon && (
                      <button className="btn btn-sm btn-primary ml-1 float-end" onClick={(e) => openEditModal(block, e)} role="button">
                        <i className="bi bi-pencil"></i>
                      </button>
                    )}

                    {block.isConfirmed && <i className="bi bi-patch-check-fill text-primary ml-1"></i>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockGridLayout;
