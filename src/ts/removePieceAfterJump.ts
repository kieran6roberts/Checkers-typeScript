import { selectedPiece } from "./control";

const removePieceAfterJump = (): void => {
  selectedPiece.jumpPieceID && document.querySelector(`#${selectedPiece.jumpPieceID}`)?.remove();
};

export default removePieceAfterJump;