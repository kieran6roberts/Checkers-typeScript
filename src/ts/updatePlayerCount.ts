import { gameControl, PLAYER } from "./control";

const updatePlayerCount = (): void => {
  gameControl.currentPlayer === PLAYER.RED && --gameControl.bluePlayerPieces;
  gameControl.currentPlayer === PLAYER.BLUE && --gameControl.redPlayerPieces;
};

export default updatePlayerCount;