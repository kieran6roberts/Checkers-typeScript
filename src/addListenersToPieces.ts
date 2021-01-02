import setCurrentPieceHandler from "./setCurrentPieceHandler";

const addListenersToPieces = (player1: Element[], player2: Element[]): void => {
  player1.forEach(piece => piece && piece.addEventListener("click", setCurrentPieceHandler));
  player2.forEach(piece => piece && piece.removeEventListener("click", setCurrentPieceHandler));
};

export default addListenersToPieces;