import { selectedPiece, gameControl, PLAYER } from "./control";
import appendScoreToDOM from "./appendScoreToDOM";
import checkForWinCondition from "./checkForWinCondition";
import checkIsPieceKing from "./checkIsPieceKing";
import removePieceAfterJump from "./removePieceAfterJump";
import removeValidDrops from "./removeValidDrops";
import resetSettings from "./resetSettings";
import setCurrentPieceHandler from "./setCurrentPieceHandler";
import updatePlayerCount from "./updatePlayerCount";

const shouldPieceBeRemoved = (id: string): void => {
  const indexDifference = Math.abs(parseInt(id) - selectedPiece.index);
  removeValidDrops();
  
  if (indexDifference > 9) {
    selectedPiece.firstMove = false;
    removePieceAfterJump();
    updatePlayerCount();
    appendScoreToDOM();
    gameControl.currentPlayer === PLAYER.RED ? checkForWinCondition(gameControl.bluePlayerPieces) : checkForWinCondition(gameControl.redPlayerPieces);
    checkIsPieceKing() ? resetSettings() : setCurrentPieceHandler(selectedPiece.id);
  } else {
    checkIsPieceKing();
    resetSettings();
  }
};

export default shouldPieceBeRemoved;