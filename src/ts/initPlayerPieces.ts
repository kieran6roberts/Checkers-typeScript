import { gameControl, PLAYER } from "./control";

const initPlayerPieces = (player: PLAYER, callback: (event: Event | string) => void): void => {
  const redPiecesElements = document.querySelectorAll("[data-color='red']");
  const bluePiecesElements = document.querySelectorAll("[data-color='blue']");

  const redPieces = Array.from(redPiecesElements);
  const bluePieces = Array.from(bluePiecesElements);
  
  if (player === PLAYER.RED) {
    gameControl.currentPlayer = PLAYER.RED;
    redPieces.forEach(piece => piece && piece.addEventListener("click", callback));
    bluePieces.forEach(piece => piece && piece.removeEventListener("click", callback));
  }
  else if (player === PLAYER.BLUE) {
    gameControl.currentPlayer = PLAYER.BLUE;
    bluePieces.forEach(piece => piece && piece.addEventListener("click", callback));
    redPieces.forEach(piece => piece && piece.removeEventListener("click", callback));
  }
  else throw new Error("no valid player selecetd");
};

export default initPlayerPieces;