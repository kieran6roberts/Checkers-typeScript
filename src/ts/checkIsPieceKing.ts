import setPieceToKing from "./setPieceToKing";
import { BOARD_STATE, gameControl, PLAYER, selectedPiece} from "./control";

const checkIsPieceKing = (): boolean => {
  let isNewKing = false;
  let startSlice: number;
  let endSlice: number;

  if (gameControl.currentPlayer === PLAYER.BLUE) {
    startSlice = 0;
    endSlice = 8;
  } else {
    startSlice = 56;
    endSlice = 64;
  }

  BOARD_STATE.slice(startSlice, endSlice).forEach(piece => {
    if (piece === selectedPiece.id) {
      setPieceToKing(piece) ? isNewKing = true : null;
    }
  });

  return isNewKing;
};

export default checkIsPieceKing;