import React from "react";
import { BlockOptionsComponentProps } from "./PlayListLayout";
import SidebarContent from "./SidebarContent";

const PlayGridLayout: React.FC<BlockOptionsComponentProps> = ({ game, blocks, claim, sidebar }) => {

  return (
    <div className="row pt-2 px-0">
      {sidebar &&
        <div className="col-xl-3 pb-3"><SidebarContent game={game}></SidebarContent></div>}
      <div className={sidebar ? "col-xl-9" : "col-xl-12"}>
        <div className="row square-row pb-0 px-3">
          {blocks?.map((block) => (
            <div key={block.index} className={`col-4 col-md-3 col-lg-2 ` + (sidebar ? "col-xl-1 col-xxl-1" : "col-xl-1 col-xxl-1")}>
              <div className={"square text-center " + (block.isWinner ? "bg-warning text-black" : "")}>
                <span className="text-truncate d-block bg-secondary is bg-gradient text-white px-1">
                  {block.index}. {block.title}
                </span>
                {block.isClaimed && (
                  <div>
                    <span className="cursive text-truncate d-block">{block?.claimedByFriendlyName}</span>
                  </div>
                )}
                {!block.isClaimed && (
                  <div>
                    <button onClick={(e) => claim(e, block)} disabled={game.isWon || block.isClaimed} role="button" className="btn-primary btn btn-smaller">
                      Claim
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayGridLayout;
