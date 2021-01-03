import resetSelectedPiece from "./resetSelectedPiece";
import removeValidDrops from "./removeValidDrops";
import movePieceWithClickHandler from "./movePieceWithClickHandler";
import initPlayerPieces from "./initPlayerPieces";
import setCurrentPieceHandler from "./setCurrentPieceHandler";
import { gameControl, PLAYER } from "./control";


const changePlayerTurn = (): void => {
  resetSelectedPiece();
  removeValidDrops(movePieceWithClickHandler);

  const redPlayerElement = document.querySelector(".scoreboard__red");
  const bluePlayerElement = document.querySelector(".scoreboard__blue");
  
  if (gameControl.currentPlayer === PLAYER.RED) {
    gameControl.currentPlayer = PLAYER.BLUE;
    bluePlayerElement?.classList.add("player-turn");
    redPlayerElement?.classList.remove("player-turn");
  }
  else {
    gameControl.currentPlayer = PLAYER.RED;
    redPlayerElement?.classList.add("player-turn");
    bluePlayerElement?.classList.remove("player-turn");
  }
  
  initPlayerPieces(gameControl.currentPlayer, setCurrentPieceHandler);
};

export default changePlayerTurn;