import { ELEMENTS, MOVE } from "./control";

const toggleMoveToSquareHandler = (element: ELEMENTS, mode: MOVE, callback: any): void => {
  if (Array.isArray(element)) {
    element.forEach(el => el.removeEventListener("click", callback));
  }
  else {
    mode === MOVE.ENABLE && element.addEventListener("click", callback);
    mode === MOVE.RESET && element.removeEventListener("click", callback);
  }
};

export default toggleMoveToSquareHandler;