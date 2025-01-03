import { GameComponentProps } from "@/cards/[cardId]";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface GameWinComponentProps extends GameComponentProps {
  canDraw: boolean;
  isSavingWinner: boolean;
  drawWinner: (e: React.FormEvent) => void;
}

const GameWin = ({ game: game, register, canDraw, isSavingWinner, drawWinner }: GameWinComponentProps) => {
  return (
    <>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="title" className="text-black">
            Who can win? <p className="small text-muted font-italic">If checked only cells which have been confirmed can win</p>
          </label>
          <div className="form-check form-switch">
            <label className="form-check-label" htmlFor="confirmedWinnersOnly"> <input
              className="form-check-input"
              type="checkbox"
              id="confirmedWinnersOnly"
              disabled={game.isWon}
              defaultChecked={game.confirmedWinnersOnly}
              {...register('confirmedWinnersOnly', { pattern: /^[A-Za-z0-9-]+$/ })} />
              Confirmed blocks only</label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="title" className="text-black">
            Pick a winner <p className="small text-muted font-italic">Hit this when ready to draw a winner!</p>
          </label>
          <div>
            <button disabled={!canDraw || game.isWon} type="submit" onClick={(e) => drawWinner(e)} className="ml-1 btn btn-warning">
              {!isSavingWinner && <span>Draw winner </span>}
              {isSavingWinner && (
                <>
                  <span>Saving... </span>
                  <div className="spinner-grow spinner-grow-sm text-light" role="status">
                    <span className="sr-only">Drawing winner...</span>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWin;
