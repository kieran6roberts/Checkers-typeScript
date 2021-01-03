import { selectedPiece, gameControl, PLAYER } from "./control";
import appendScoreToDOM from "./appendScoreToDOM";
import checkForWinCondition from "./checkForWinCondition";
import checkIsPieceKing from "./checkIsPieceKing";
import removePieceAfterJump from "./removePieceAfterJump";
import changePlayerTurn from "./changePlayerTurn";
import setCurrentPieceHandler from "./setCurrentPieceHandler";
import updatePlayerCount from "./updatePlayerCount";

const shouldPieceBeRemoved = (id: string): void => {
  const indexDifference = Math.abs(parseInt(id) - selectedPiece.index);
  
  if (indexDifference > 9) {
    selectedPiece.firstMove = false;
    removePieceAfterJump();
    updatePlayerCount();
    appendScoreToDOM();
    gameControl.currentPlayer === PLAYER.RED ? checkForWinCondition(gameControl.bluePlayerPieces) : checkForWinCondition(gameControl.redPlayerPieces);
    checkIsPieceKing() ? changePlayerTurn() : setCurrentPieceHandler(selectedPiece.id);
  } else {
    checkIsPieceKing();
    changePlayerTurn();
  }
};

export default shouldPieceBeRemoved;