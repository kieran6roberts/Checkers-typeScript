import movePieceWithClickHandler from "./movePieceWithClickHandler";
import { ELEMENTS, MOVE } from "./control";

const toggleMoveToSquareHandler = (element: ELEMENTS, mode: MOVE): void => {
  if (Array.isArray(element)) {
    element.forEach(el => el.removeEventListener("click", movePieceWithClickHandler));
  }
  else {
    mode === MOVE.ENABLE && element.addEventListener("click", movePieceWithClickHandler);
    mode === MOVE.RESET && element.removeEventListener("click", movePieceWithClickHandler);
  }
};

export default toggleMoveToSquareHandler;