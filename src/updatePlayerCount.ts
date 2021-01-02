import { bluePlayerPieces, 
  currentPlayer, 
  redPlayerPieces, 
  PLAYER } from "./index";

const updatePlayerCount = () => {
  if (currentPlayer === PLAYER.RED) {
    --bluePlayerPieces;
  } else if (currentPlayer === PLAYER.BLUE) {
    --redPlayerPieces;
  }
};

export default updatePlayerCount;