import addListenersToPieces from "./addListenersToPieces";
import { gameControl, PLAYER } from "./index";

const redPieces = [...document.querySelectorAll("[data-color='red']")];
const bluePieces = [...document.querySelectorAll("[data-color='blue']")];

const initPlayerPieces = (player: PLAYER) => {
  if (player === PLAYER.RED) {
    gameControl.currentPlayer = PLAYER.RED;
    addListenersToPieces(redPieces, bluePieces);
    //redPieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else if (player === PLAYER.BLUE) {
    gameControl.currentPlayer = PLAYER.BLUE;
    addListenersToPieces(bluePieces, redPieces);
    //bluePieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else throw new Error("no valid player selecetd");
};

export default initPlayerPieces;