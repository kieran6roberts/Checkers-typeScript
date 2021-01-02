import { selectedPiece } from "./index";
import appendScoreToDOM from "./appendScoreToDOM";
import checkForWinCondition from "./checkForWinCondition";
import checkIsPieceKing from "./checkIsPieceKing";
import removePieceAfterJump from "./removePieceAfterJump";
import removeValidDrops from "./removeValidDrops";
import resetSettings from "./resetSettings";
import setCurrentPieceHandler from "./setCurrentPieceHandler";
import updatePlayerCount from "./updatePlayerCount";

const shouldPieceBeRemoved = (id: string) => {
  const indexDifference = Math.abs(parseInt(id) - selectedPiece.index);
  // piece jumped other player's piece
  removeValidDrops();
  
  if (indexDifference > 9) {
    selectedPiece.firstMove = false;
    removePieceAfterJump();
    updatePlayerCount();
    appendScoreToDOM();
    checkForWinCondition();
    if (checkIsPieceKing()) {
      resetSettings();
    } else {
      setCurrentPieceHandler(selectedPiece.id);
    }
  } else {
    checkIsPieceKing();
    resetSettings();
  }
};

export default shouldPieceBeRemoved;