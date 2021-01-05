import { gameControl } from "./control";

const redScoreElement = document.querySelector(".scoreboard__red-score");
const blueScoreElement = document.querySelector(".scoreboard__blue-score");

const appendScoreToDOM = (): void => {
  
  if (redScoreElement && blueScoreElement) {
    redScoreElement.textContent = gameControl.redPlayerPieces.toString();
    blueScoreElement.textContent = gameControl.bluePlayerPieces.toString();
  } else throw new Error("problem locating score elements!");
};

export default appendScoreToDOM;