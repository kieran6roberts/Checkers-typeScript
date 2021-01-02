import setPieceToKing from "./setPieceToKing";
import { BOARD_STATE, 
  gameControl, 
  PLAYER, 
  selectedPiece} from "./control";

const checkIsPieceKing = (): boolean => {


  
  let isKing = false;
  if (gameControl.currentPlayer === PLAYER.BLUE) {
    BOARD_STATE.slice(0, 8).find(piece => {
      if (piece?.includes(selectedPiece.id)) {
        setPieceToKing(piece);
        isKing = true;
      }
    });
  } else if (gameControl.currentPlayer === PLAYER.RED) {
    BOARD_STATE.slice(56, 63).find(piece => {
      if (piece?.includes(selectedPiece.id)) {
        setPieceToKing(piece);
        isKing = true;
      }
    });
  } else isKing = false;
  return isKing;
};

export default checkIsPieceKing;