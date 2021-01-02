const toggleValidMoveSquare = (element: Element, toggle: string) => {
  if (element && toggle === "add") {
    element.classList.add("valid-drop");
  } else if (element && toggle === "remove") {
    element.classList.remove("valid-drop");
  } else throw new Error("no element available");
};

export default toggleValidMoveSquare;