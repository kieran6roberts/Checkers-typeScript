import { CLASS } from "./control";

const toggleValidMoveSquare = (element: Element, toggle: CLASS): void => {
  if (!element) throw new Error("toggle class element does no exist!");

  toggle === CLASS.ADD && element.classList.add("valid-drop");
  toggle === CLASS.REMOVE && element.classList.remove("valid-drop");
};

export default toggleValidMoveSquare;