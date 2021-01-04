import toggleValidMoveSquare from "./toggleValidMoveSquare";

const removeValidDrops = (callback: (e: Event) => void): void => {
  const listenerElements = document.querySelectorAll(".valid-drop");
  
  listenerElements.forEach(element => toggleValidMoveSquare(element, "remove"));
  Array.from(listenerElements).forEach(el => el.removeEventListener("click", callback));
};

export default removeValidDrops;