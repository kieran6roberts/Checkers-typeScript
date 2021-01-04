import setPieceToKing from "./setPieceToKing";
import { BOARD_STATE, gameControl, PLAYER, selectedPiece} from "./control";

const checkIsPieceKing = (): boolean => {
  let isKing = false;
  let startSlice: number;
  let endSlice: number;

  if (gameControl.currentPlayer === PLAYER.BLUE) {
    startSlice = 0;
    endSlice = 8;
  } else {
    startSlice = 56;
    endSlice = 63;
  }

  BOARD_STATE.slice(startSlice, endSlice).find(piece => {
    if (piece?.includes(selectedPiece.id)) {
      setPieceToKing(piece);
      isKing = true;
    } else isKing = false;
  });

  return isKing;
};

export default checkIsPieceKing;