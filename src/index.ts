const redPieces = [...document.querySelectorAll("[data-color='red']")];
const bluePieces = [...document.querySelectorAll("[data-color='blue']")];
const squares = [...document.querySelectorAll(".square")];

type PLAYERS = "red" | "blue";
type MOVES = "enable" | "reset";
type ELEMENTS = Element | Element[];

const PLAYER1 = "red";
const PLAYER2 = "blue";
const MOVE_ENABLE = "enable";
const MOVE_RESET = "reset";


const BOARD_STATE = [
  null, "a2", null, "a4", null, "a6", null, "a8", 
  "b1", null, "b3", null, "b5", null, "b7", null,
  null, "c2", null, "c4", null, "c6", null, "c8",
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  "f1", null, "f3", null, "f5", null, "f7", null,
  null, "g2", null, "g4", null, "g6", null, "g8",
  "h1", null, "h3", null, "h5", null, "h7", null,
];

let selectedPiece = {
  id: "-1",
  index: -1,
  isPieceKing: false,
};

const resetSelectedPiece = () => {
  selectedPiece.id = "-1";
  selectedPiece.index = -1;
  selectedPiece.isPieceKing = false;
};

const setCurrentPieceHandler = (event: Event) => {
  const activePieceID = (<HTMLElement>event.target).id;
  const activePieceBoardPosition = BOARD_STATE.indexOf(activePieceID);
  selectedPiece.id = activePieceID;
  selectedPiece.index = activePieceBoardPosition;
  setValidMoves();
};

/*
const setDragInitHandler = (event: DragEvent) => {
  const activePieceID = (<HTMLElement>event.target).id;
  const activePieceClass = (<HTMLElement>event.target).classList;
  event.dataTransfer?.setData("text/plain", activePieceID);
  event && event.dataTransfer?.dropEffect === "move";
  activePieceClass.add("fade");
  setCurrentPieceHandler(event);
};*/

const initPlayerPieces = (player: PLAYERS) => {
  console.log("init player pieces");
  if (player === PLAYER1) {
    redPieces.forEach(piece => piece.addEventListener("click", (event) => setCurrentPieceHandler(event)));
    //redPieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else if (player === PLAYER2) {
    bluePieces.forEach(piece => piece.addEventListener("click", (event) => setCurrentPieceHandler(event)));
    //bluePieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
};

const toggleMoveToSquareHandler = (element: ELEMENTS, mode: MOVES) => {
  if (Array.isArray(element)) {
    element.forEach(el => el.removeEventListener("click", movePieceWithClickHandler));
    //element.forEach(el => el.removeEventListener("drop", movePieceWithDragHandler));
  }
  else {
    if (mode === MOVE_ENABLE) {
      element.addEventListener("click", movePieceWithClickHandler);
      //element.addEventListener("drop", movePieceWithDragHandler);
    }
    else if (mode === MOVE_RESET) {
      element.removeEventListener("click", movePieceWithClickHandler);
      //element.removeEventListener("drop", movePieceWithDragHandler);
    }
  }
};

const toggleValidMoveSquare = (element: Element): void => {
  element.classList.toggle("valid-drop");
};

const setValidMoves = (): void => {
  const pIndex = selectedPiece.index;
  if (BOARD_STATE[pIndex + 7] === null) {
    const validElement = squares[pIndex + 7];
    toggleValidMoveSquare(validElement);
    toggleMoveToSquareHandler(validElement ,MOVE_ENABLE);
  }
  if (BOARD_STATE[pIndex + 9] === null) {
    const validElement = squares[pIndex + 9];
    toggleValidMoveSquare(validElement);
    toggleMoveToSquareHandler(validElement ,MOVE_ENABLE);
  }
  if (BOARD_STATE[pIndex - 7] === null) {
    const validElement = squares[pIndex - 7];
    toggleValidMoveSquare(validElement);
    toggleMoveToSquareHandler(validElement ,MOVE_ENABLE);
  }
  if (BOARD_STATE[pIndex - 9] === null) {
    const validElement = squares[pIndex - 9];
    toggleValidMoveSquare(validElement);
    toggleMoveToSquareHandler(validElement ,MOVE_ENABLE);
  }

  console.log(selectedPiece);
};

/*
const movePieceWithDragHandler = (event: any) => {
  event.preventDefault();
  console.log("moved piece with drag");
  const id  = event.dataTransfer.getData("text");
  const activePiece = document.querySelector(`#${id}`);
  console.log(activePiece);
  event.currentTarget.appendChild(activePiece);

  const listenerElements = document.querySelectorAll(".valid-drop");
  toggleMoveToSquareHandler([...listenerElements], MOVE_RESET);
};*/

const movePieceWithClickHandler = (event: any) => {
  console.log("moved piece with click");
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  activePiece.remove();
  event.currentTarget.appendChild(activePiece);

  const listenerElements = document.querySelectorAll(".valid-drop");
  listenerElements.forEach(element => toggleValidMoveSquare(element));
  toggleMoveToSquareHandler([...listenerElements], MOVE_RESET);
  resetSelectedPiece();
};

initPlayerPieces(PLAYER1);