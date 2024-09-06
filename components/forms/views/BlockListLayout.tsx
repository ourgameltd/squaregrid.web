import { Block } from "@/Block";
import { GameFormModel } from "@/Game";
import React from "react";
import Image from "next/image";
import { withNewLines } from "@/stringUtils";

export interface BlockOptionsComponentProps {
  game: GameFormModel;
  blocks: Block[];
  openEditModal: (block: Block, event: React.FormEvent) => void;
  removeBlock: (partitionKey: string, rowKey: string, event: React.FormEvent) => void;
  sidebar: boolean;
}

const BlockListLayout: React.FC<BlockOptionsComponentProps> = ({ game, blocks, removeBlock, openEditModal, sidebar }) => {

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
          {blocks?.length > 0 &&
            <ul className="list-group">
              <li className="list-group-item">
                <div className="container px-0">
                  <div className="row text-left fw-bold px-0">
                    <div className="col-4 px-0">Title</div>
                    <div className="col-8 px-0">Claimed by</div>
                  </div>
                </div>
              </li>
              {blocks?.map((block) => (
                <li key={block.index} className={"list-group-item fs-6 " + (block.isWinner ? "bg-warning" : "")}>
                  <div className="container px-0">
                    <div className="row text-left px-0">
                      <div className="col-4 px-0">
                        <span className="text-truncate d-block">
                          {block.index}. {block.title}
                        </span>
                      </div>
                      <div className="col-8 px-0">
                        <span className="cursive text-truncate mr-2">
                          {block?.claimedByFriendlyName}
                        </span>
                        {block.isConfirmed && <i className="bi bi-patch-check-fill text-primary"></i>}
                        <span className="float-right">
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
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>}
        </div>
      </div>
    </div>
  );
};

export default BlockListLayout;
