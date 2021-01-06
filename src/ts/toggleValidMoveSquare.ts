import { CLASS } from "./control";

const toggleValidMoveSquare = (element: Element, toggle: CLASS): void => {
  if (!element) throw new Error("element does not exist!");

  toggle === CLASS.ADD && element.classList.add("valid-drop");
  toggle === CLASS.REMOVE && element.classList.remove("valid-drop");
};

export default toggleValidMoveSquare;