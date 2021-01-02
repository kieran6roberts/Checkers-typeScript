import toggleMoveToSquareHandler from "./toggleMoveToSquareHandler";
import toggleValidMoveSquare from "./toggleValidMoveSquare";
import { MOVE } from "./control";

const removeValidDrops = (): void => {
  const listenerElements = document.querySelectorAll(".valid-drop");
  listenerElements.forEach(element => toggleValidMoveSquare(element, "remove"));
  
  toggleMoveToSquareHandler(Array.from(listenerElements), MOVE.RESET);
};

export default removeValidDrops;