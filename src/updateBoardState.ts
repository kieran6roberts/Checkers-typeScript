import { BOARD_STATE, selectedPiece } from "./index";

const updateBoardState = (squareNumOfNewPosition: number) => {
  BOARD_STATE[squareNumOfNewPosition] = selectedPiece.id;
  BOARD_STATE[selectedPiece.index] = null;
  
  const squareNumOfRemovedPiece = BOARD_STATE.indexOf(selectedPiece.jumpPieceID);
  
  if (squareNumOfNewPosition > squareNumOfRemovedPiece) {
    if (squareNumOfNewPosition - squareNumOfRemovedPiece === 7 || 
        squareNumOfNewPosition - squareNumOfRemovedPiece === 9) {
      BOARD_STATE[squareNumOfRemovedPiece] = null;
    }
  } else {
    if (squareNumOfRemovedPiece - squareNumOfNewPosition === 7 || 
        squareNumOfRemovedPiece - squareNumOfNewPosition === 9) {
      BOARD_STATE[squareNumOfRemovedPiece] = null;
    }
  }
};

export default updateBoardState;