import toggleMoveToSquareHandler from "./toggleMoveToSquareHandler";
import toggleValidMoveSquare from "./toggleValidMoveSquare";
import { MOVE } from "./index";

const removeValidDrops = () => {
  const listenerElements = [...document.querySelectorAll(".valid-drop")];
  listenerElements.forEach(element => toggleValidMoveSquare(element, "remove"));
  toggleMoveToSquareHandler(listenerElements, MOVE.RESET);
};

export default removeValidDrops;