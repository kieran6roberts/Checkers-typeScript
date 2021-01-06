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
    endSlice = 64;
  }

  console.log(BOARD_STATE.slice(startSlice, endSlice));

  BOARD_STATE.slice(startSlice, endSlice).forEach(piece => {
    if (piece === selectedPiece.id) {
      setPieceToKing(piece);
      return isKing = true;
    }
  });

  return isKing;
};

export default checkIsPieceKing;