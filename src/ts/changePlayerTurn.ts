import initPlayerPieces from "./initPlayerPieces";
import { gameControl, PLAYER } from "./control";


const changePlayerTurn = (): void => {
  const redPlayerElement = document.querySelector(".scoreboard__red");
  const bluePlayerElement = document.querySelector(".scoreboard__blue");
  
  if (gameControl.currentPlayer === PLAYER.RED) {
    initPlayerPieces(PLAYER.BLUE);
    bluePlayerElement?.classList.add("player-turn");
    redPlayerElement?.classList.remove("player-turn");
  }
  else {
    initPlayerPieces(PLAYER.RED);
    redPlayerElement?.classList.add("player-turn");
    bluePlayerElement?.classList.remove("player-turn");
  }
};

export default changePlayerTurn;