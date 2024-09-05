import { GameFormModel } from "@/Game";
import React from "react";
import SidebarContent from "../SidebarContent";

interface SidebarContentComponentProps {
  game: GameFormModel;
  show: boolean;
  onClose: () => void;
}

const PlayInfoModal: React.FC<SidebarContentComponentProps> = ({ game, show, onClose }) => {

  return (
    <>
      <div className="modal-overlay" style={{ background: "#CBCBCB", opacity: 0.7, display: show ? "block" : "none" }}></div>
      <div className={`modal fade ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content" style={{ background: "#FFF", opacity: 1 }}>
            <div className="modal-header">
              <h5 className="modal-title">{game.title}</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <SidebarContent game={game}></SidebarContent>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayInfoModal;
