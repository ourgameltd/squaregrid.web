import { Block } from "@/Block";
import { GameFormModel } from "@/Game";
import React from "react";
import SidebarContent from "./SidebarContent";

export interface BlockOptionsComponentProps {
  game: GameFormModel;
  blocks: Block[];
  claim: (e: React.FormEvent, updatedBlock: Block) => void;
  sidebar: boolean;
}

const PlayListLayout: React.FC<BlockOptionsComponentProps> = ({ game, blocks, claim, sidebar }) => {

  return (
    <div className="row pt-2 px-0">
      {sidebar &&
        <div className="col-xl-4 pb-3"><SidebarContent game={game}></SidebarContent></div>}
      <div className={sidebar ? "col-xl-8" : "col-xl-12"}>
        {blocks?.length > 0 &&
          <ul className="list-group">
            <li className="list-group-item">
              <div className="container">
                <div className="row text-left fw-bold">
                  <div className="col-5">Title</div>
                  <div className="col-7">Claimed by</div>
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
                    <div className="col-7">
                      <span className="cursive text-truncate">{block?.claimedByFriendlyName}</span>
                      <button
                        onClick={(e) => claim(e, block)}
                        disabled={game.isWon || block.isClaimed}
                        role="button"
                        className="btn-secondary btn btn-smaller float-right"
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>}
      </div>
    </div>
  );
};

export default PlayListLayout;
