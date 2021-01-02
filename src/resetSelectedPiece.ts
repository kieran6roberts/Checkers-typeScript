import { selectedPiece } from "./index";

const resetSelectedPiece = () => {
  selectedPiece.id = "-1";
  selectedPiece.index = -1;
  selectedPiece.isPieceKing = false;
  selectedPiece.jumpPieceID = null;
  selectedPiece.firstMove = true;
};

export default resetSelectedPiece;