import React from "react";
import Image from "next/image";
import { withNewLines } from "@/stringUtils";
import { GameFormModel } from "@/Game";

export interface SidebarContentComponentProps {
  game: GameFormModel;
}

const SidebarContent: React.FC<SidebarContentComponentProps> = ({ game }) => {

  return (
      <div className="card">
        <div className="row">
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
          </div>
          <div className="col-md-12">
            <div className="card-body">
              <h5 className="card-title">{game?.title}</h5>
              <p className="card-text" dangerouslySetInnerHTML={{ __html: withNewLines(game?.description) }}></p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SidebarContent;
