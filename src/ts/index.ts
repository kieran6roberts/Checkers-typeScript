import appendScoreToDOM from "./appendScoreToDOM";
import initPlayerPieces from "./initPlayerPieces";
import setCurrentPieceHandler from "./setCurrentPieceHandler";
import { gameControl } from "./control";
import "../../main.css";

const gameInit = (): void => {
  initPlayerPieces(gameControl.currentPlayer, setCurrentPieceHandler);
  appendScoreToDOM();
};

window.addEventListener("DOMContentLoaded", gameInit);
