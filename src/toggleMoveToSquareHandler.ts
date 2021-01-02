import { ELEMENTS, MOVE } from "./index";

const toggleMoveToSquareHandler = (element: ELEMENTS, mode?: MOVE) => {
  if (Array.isArray(element)) {
    element.forEach(el => el.removeEventListener("click", movePieceWithClickHandler));
    //element.forEach(el => el.removeEventListener("drop", movePieceWithDragHandler));
  }
  else {
    if (mode === MOVE.ENABLE) {
      element.addEventListener("click", movePieceWithClickHandler);
      //element.addEventListener("drop", movePieceWithDragHandler);
    }
    else if (mode === MOVE.RESET) {
      element.removeEventListener("click", movePieceWithClickHandler);
      //element.removeEventListener("drop", movePieceWithDragHandler);
    }
    else throw new Error("no move is defined!");
  }
};

export default toggleMoveToSquareHandler;