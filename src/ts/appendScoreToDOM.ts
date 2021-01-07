import { gameControl } from "./control";


const appendScoreToDOM = (): void => {
  const redScoreElement = document.querySelector(".scoreboard__red-score");
  const blueScoreElement = document.querySelector(".scoreboard__blue-score");
  
  if (redScoreElement && blueScoreElement) {
    redScoreElement.textContent = `pieces: ${gameControl.redPlayerPieces.toString()}`;
    blueScoreElement.textContent = `pieces: ${gameControl.bluePlayerPieces.toString()}`;
  } else throw new Error("problem locating score elements!");
};

export default appendScoreToDOM;