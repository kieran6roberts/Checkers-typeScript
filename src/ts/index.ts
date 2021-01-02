import * as GameControl from "./control";
import appendScoreToDOM from "./appendScoreToDOM";
import initPlayerPieces from "./initPlayerPieces";

const gameInit = (): void => {
  initPlayerPieces(GameControl.PLAYER.RED);
  appendScoreToDOM();
};

window.addEventListener("DOMContentLoaded", gameInit);
