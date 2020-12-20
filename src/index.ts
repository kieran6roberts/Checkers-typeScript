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

let currentPlayer: PLAYERS;
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
  if (player === PLAYER1) {
    console.log("init red player pieces");
    currentPlayer = PLAYER1;
    bluePieces.forEach(piece => piece.removeEventListener("click", setCurrentPieceHandler));
    redPieces.forEach(piece => piece.addEventListener("click", setCurrentPieceHandler));
    //redPieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else if (player === PLAYER2) {
    console.log("init blue player pieces");
    currentPlayer = PLAYER2;
    redPieces.forEach(piece => piece.removeEventListener("click", setCurrentPieceHandler));
    bluePieces.forEach(piece => piece.addEventListener("click", setCurrentPieceHandler));
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

const updateBoardState = ( newState: number ) => {
  BOARD_STATE[selectedPiece.index] = null;
  BOARD_STATE[newState] = selectedPiece.id;
};

const setValidMoves = (): void => {
  const PIECE_INDEX = selectedPiece.index;
  const LIGHT = "light";

  const checkForEmptySquare = (num: number) => {
    if (BOARD_STATE[PIECE_INDEX + num] === null && !squares[PIECE_INDEX + num].hasChildNodes()) {
      return true;
    } else return false;
  };

  const checkForLightColoredSquare = (num: number) => squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT ? true : false;

  const checkForOpponentJump = () => {
    console.log(currentPlayer);
    switch (currentPlayer) {
    case PLAYER1:     
      if (squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") === "blue") {
        toggleValidMoveSquare(squares[PIECE_INDEX + (14)]);
        return;
      } else if (squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") === "blue") {
        toggleValidMoveSquare(squares[PIECE_INDEX + (18)]);
        return;
      } else break;
    case PLAYER2: 
      if (squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") === "red") {
        toggleValidMoveSquare(squares[PIECE_INDEX - (14)]);
        return;
      } else if (squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") === "red") {
        toggleValidMoveSquare(squares[PIECE_INDEX - (18)]);
        return;
      } else break;
    default:
      throw new Error("problem with current player not set correctly!");
    }
  };

  if (checkForEmptySquare(7) && checkForLightColoredSquare(7)) { 
    toggleValidMoveSquare(squares[PIECE_INDEX + 7]);
    toggleMoveToSquareHandler(squares[PIECE_INDEX + 7], MOVE_ENABLE);
    checkForOpponentJump();
  }
  if (checkForEmptySquare(9) && checkForLightColoredSquare(9)) {
    toggleValidMoveSquare(squares[PIECE_INDEX + 9]);
    toggleMoveToSquareHandler(squares[PIECE_INDEX + 9], MOVE_ENABLE);
    checkForOpponentJump();
  }
  if (checkForEmptySquare(-7) && checkForLightColoredSquare(-7)) {
    toggleValidMoveSquare(squares[PIECE_INDEX - 7]);
    toggleMoveToSquareHandler(squares[PIECE_INDEX - 7], MOVE_ENABLE);
    checkForOpponentJump();
  }
  if (checkForEmptySquare(-9) && checkForLightColoredSquare(-9)) {
    toggleValidMoveSquare(squares[PIECE_INDEX - 9]);
    toggleMoveToSquareHandler(squares[PIECE_INDEX - 9], MOVE_ENABLE);
    checkForOpponentJump();
  }
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

const changePlayerTurn = () => {
  if (currentPlayer === PLAYER1) initPlayerPieces(PLAYER2);
  else initPlayerPieces(PLAYER1);
};


const resetSettings = () => {
  const listenerElements = document.querySelectorAll(".valid-drop");
  listenerElements.forEach(element => toggleValidMoveSquare(element));
  toggleMoveToSquareHandler([...listenerElements], MOVE_RESET);
  resetSelectedPiece();
  changePlayerTurn();
};

const movePieceWithClickHandler = (event: any) => {
  console.log("moved piece with click");
  const targetID = (<HTMLElement>event.target).id;
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  activePiece.remove();
  const target = event.currentTarget;
  target.appendChild(activePiece);
  updateBoardState(parseInt(targetID));
  console.log(BOARD_STATE);
  resetSettings();
};

initPlayerPieces(PLAYER1);