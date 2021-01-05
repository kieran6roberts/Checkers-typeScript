import toggleValidMoveSquare from "./toggleValidMoveSquare";
import { CLASS } from "./control";

const removeValidDrops = (callback: (event: Event) => void): void => {
  const listenerElements = document.querySelectorAll(".valid-drop");
  
  listenerElements.forEach(element => toggleValidMoveSquare(element, CLASS.REMOVE));
  Array.from(listenerElements).forEach(el => el.removeEventListener("click", callback));
};

export default removeValidDrops;