import addListenersToPieces from "./addListenersToPieces";
import { gameControl, PLAYER } from "./control";

const redPiecesElements = document.querySelectorAll("[data-color='red']");
const bluePiecesElements = document.querySelectorAll("[data-color='blue']");

const redPieces = Array.from(redPiecesElements);
const bluePieces = Array.from(bluePiecesElements);

const initPlayerPieces = (player: PLAYER): void => {
  if (player === PLAYER.RED) {
    gameControl.currentPlayer = PLAYER.RED;
    addListenersToPieces(redPieces, bluePieces);
  }
  else if (player === PLAYER.BLUE) {
    gameControl.currentPlayer = PLAYER.BLUE;
    addListenersToPieces(bluePieces, redPieces);
  }
  else throw new Error("no valid player selecetd");
};

export default initPlayerPieces;