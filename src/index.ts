import appendScoreToDOM from "./appendScoreToDOM";
import initPlayerPieces from "./initPlayerPieces";
import { PLAYER } from "./control";

initPlayerPieces(PLAYER.RED);
appendScoreToDOM();