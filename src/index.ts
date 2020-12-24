const redPieces = [...document.querySelectorAll("[data-color='red']")];
const bluePieces = [...document.querySelectorAll("[data-color='blue']")];
const squares = [...document.querySelectorAll(".square")];

enum MOVE { 
  ENABLE = "enable", 
  RESET = "reset" 
}

enum PLAYER { 
  RED = "red",
  BLUE ="blue"
}

type ELEMENTS = Element | Element[];
type SELECTED_PIECE = {
  id: string,
  index: number,
  isPieceKing: boolean,
  jumpPieceID: string | null
};

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

let currentPlayer: PLAYER;

const selectedPiece: SELECTED_PIECE = {
  id: "-1",
  index: -1,
  isPieceKing: false,
  jumpPieceID: null
};

const resetSelectedPiece = () => {
  selectedPiece.id = "-1";
  selectedPiece.index = -1;
  selectedPiece.isPieceKing = false;
  selectedPiece.jumpPieceID = null;
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

const initPlayerPieces = (player: PLAYER) => {
  if (player === PLAYER.RED) {
    console.log("init red player pieces");
    currentPlayer = PLAYER.RED;
    bluePieces.forEach(piece => piece.removeEventListener("click", setCurrentPieceHandler));
    redPieces.forEach(piece => piece.addEventListener("click", setCurrentPieceHandler));
    //redPieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else if (player === PLAYER.BLUE) {
    console.log("init blue player pieces");
    currentPlayer = PLAYER.BLUE;
    redPieces.forEach(piece => piece.removeEventListener("click", setCurrentPieceHandler));
    bluePieces.forEach(piece => piece.addEventListener("click", setCurrentPieceHandler));
    //bluePieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else throw new Error("no valid player selecetd");
};

const toggleMoveToSquareHandler = (element: ELEMENTS, mode: MOVE) => {
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

const toggleValidMoveSquare = (element: Element): void => {
  element.classList.toggle("valid-drop");
};

const updateBoardState = (newState: number) => {
  BOARD_STATE[selectedPiece.index] = null;
  BOARD_STATE[newState] = selectedPiece.id;
};

const removePieceAfterJump = (query: string) => {
  const pieceToRemove = document.querySelector(query) as HTMLElement;
  const currentPosition = selectedPiece.index;
  console.log(currentPosition);
  pieceToRemove.remove();

};

const setValidMoves = (): void => {
  const PIECE_INDEX = selectedPiece.index;
  const LIGHT = "light";

  const checkForEmptySquare = (num: number) => {
    if (BOARD_STATE[PIECE_INDEX + num] === null && !squares[PIECE_INDEX + num].hasChildNodes()) {
      console.log(!squares[PIECE_INDEX + num].hasChildNodes());
      return true;
    } else return false;
  };

  const checkForLightColoredSquare = (num: number) => squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT ? true : false;

  const checkForOpponentJump = () => {
    switch (currentPlayer) {
    case PLAYER.RED:     
      if (squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") === "blue" && 
          BOARD_STATE[PIECE_INDEX + 14] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        return;
      } else if (squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") === "blue" &&
      BOARD_STATE[PIECE_INDEX + 18] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE);
        return;
      } else break;
    case PLAYER.BLUE: 
      if (squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") === "red" &&
      BOARD_STATE[PIECE_INDEX - 14] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE);
        return;
      } else if (squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") === "red" && 
      BOARD_STATE[PIECE_INDEX - 18] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE);
        return;
      } else break;
    default:
      throw new Error("problem with current player not set correctly!");
    }
  };

  switch (currentPlayer) {
  case PLAYER.RED: 
    if (checkForEmptySquare(7) && checkForLightColoredSquare(7)) { 
      toggleValidMoveSquare(squares[PIECE_INDEX + 7]);
      toggleMoveToSquareHandler(squares[PIECE_INDEX + 7], MOVE.ENABLE);
    }
    if (checkForEmptySquare(9) && checkForLightColoredSquare(9)) {
      toggleValidMoveSquare(squares[PIECE_INDEX + 9]);
      toggleMoveToSquareHandler(squares[PIECE_INDEX + 9], MOVE.ENABLE);
    }
    break;
  case PLAYER.BLUE:
    if (checkForEmptySquare(-7) && checkForLightColoredSquare(-7)) {
      toggleValidMoveSquare(squares[PIECE_INDEX - 7]);
      toggleMoveToSquareHandler(squares[PIECE_INDEX - 7], MOVE.ENABLE);
    }
    if (checkForEmptySquare(-9) && checkForLightColoredSquare(-9)) {
      toggleValidMoveSquare(squares[PIECE_INDEX - 9]);
      toggleMoveToSquareHandler(squares[PIECE_INDEX - 9], MOVE.ENABLE);
    }
    break;
  default: 
    throw new Error("problem with current player!");
  }
  checkForOpponentJump();
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
  if (currentPlayer === PLAYER.RED) initPlayerPieces(PLAYER.BLUE);
  else initPlayerPieces(PLAYER.RED);
};


const resetSettings = () => {
  const listenerElements = document.querySelectorAll(".valid-drop");
  listenerElements.forEach(element => toggleValidMoveSquare(element));
  toggleMoveToSquareHandler([...listenerElements], MOVE.RESET);
  resetSelectedPiece();
  changePlayerTurn();
};

const movePieceWithClickHandler = (event: Event) => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  activePiece.remove();
  console.log(selectedPiece.jumpPieceID);
  
  const target = <Element>event.currentTarget;
  target.appendChild(activePiece);
  
  const targetID = (<HTMLElement>event.target).id;
  updateBoardState(parseInt(targetID));
  resetSettings();
};

initPlayerPieces(PLAYER.RED);