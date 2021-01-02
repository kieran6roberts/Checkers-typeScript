import { selectedPiece } from "./index";

const removePieceAfterJump = () => {
  if (selectedPiece.jumpPieceID) {
    const pieceToRemove = document.querySelector(`#${selectedPiece.jumpPieceID}`) as HTMLElement;
    pieceToRemove.remove();
  }
};

export default removePieceAfterJump;