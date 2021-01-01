const redPieces = [...document.querySelectorAll("[data-color='red']")];
const bluePieces = [...document.querySelectorAll("[data-color='blue']")];
const squares = [...document.querySelectorAll(".square")];
const redPlayerElement = document.querySelector(".scoreboard__red")! as HTMLElement;
const bluePlayerElement = document.querySelector(".scoreboard__blue")! as HTMLElement;
const redScoreElement = document.querySelector(".scoreboard__red-score")! as HTMLElement;
const blueScoreElement = document.querySelector(".scoreboard__blue-score")! as HTMLElement;

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
  firstMove: boolean
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
let redPlayerPieces = 12;
let bluePlayerPieces = 12;

const selectedPiece: SELECTED_PIECE = {
  id: "-1",
  index: -1,
  isPieceKing: false,
  jumpPieceID: null,
  firstMove: true
};

const resetSelectedPiece = () => {
  selectedPiece.id = "-1";
  selectedPiece.index = -1;
  selectedPiece.isPieceKing = false;
  selectedPiece.jumpPieceID = null;
  selectedPiece.firstMove = true;
};

const setCurrentPieceHandler = (event: Event | string) => {
  let activePieceID: any;
  if (typeof event === "string") { 
    activePieceID = event;
  } else {
    if ((<HTMLElement>event.target).getAttribute("data-color")) {
      activePieceID = (<HTMLElement>event.target).id;
    } else {
      activePieceID = (<HTMLElement>event.target).parentElement?.id;
    }
  }
  // child click gives id of child element which is the king div;
  const activePieceBoardPosition = BOARD_STATE.indexOf(activePieceID);
  console.log(activePieceID);
  selectedPiece.id = activePieceID;
  selectedPiece.index = activePieceBoardPosition;
  const isPieceKing = document.querySelector(`#${selectedPiece.id}`);
  if (isPieceKing?.classList.contains("king")) {
    selectedPiece.isPieceKing = true;
  } else selectedPiece.isPieceKing = false;

  console.log(selectedPiece);
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

const addListenersToPieces = (player1: Element[], player2: Element[]) => {
  player1.forEach(piece => piece && piece.addEventListener("click", setCurrentPieceHandler));
  player2.forEach(piece => piece && piece.removeEventListener("click", setCurrentPieceHandler));
};

const initPlayerPieces = (player: PLAYER) => {
  if (player === PLAYER.RED) {
    currentPlayer = PLAYER.RED;
    addListenersToPieces(redPieces, bluePieces);
    //redPieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else if (player === PLAYER.BLUE) {
    currentPlayer = PLAYER.BLUE;
    addListenersToPieces(bluePieces, redPieces);
    //bluePieces.forEach(piece => piece.addEventListener("dragstart", (event: any) => setDragInitHandler(event)));
  }
  else throw new Error("no valid player selecetd");
};

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

const toggleValidMoveSquare = (element: Element) => {
  if (element) element.classList.toggle("valid-drop");
};

const updateBoardState = (squareNumOfNewPosition: number) => {
  BOARD_STATE[squareNumOfNewPosition] = selectedPiece.id;
  BOARD_STATE[selectedPiece.index] = null;

  const squareNumOfRemovedPiece = BOARD_STATE.indexOf(selectedPiece.jumpPieceID);
  console.log(`newState is ${squareNumOfNewPosition}`);
  console.log(`removalIndex is ${squareNumOfRemovedPiece}`);

  if (squareNumOfNewPosition > squareNumOfRemovedPiece) {
    if (squareNumOfNewPosition - squareNumOfRemovedPiece === 7 || 
      squareNumOfNewPosition - squareNumOfRemovedPiece === 9) {
      BOARD_STATE[squareNumOfRemovedPiece] = null;
    }
  } else {
    if (squareNumOfRemovedPiece - squareNumOfNewPosition === 7 || 
      squareNumOfRemovedPiece - squareNumOfNewPosition === 9) {
      BOARD_STATE[squareNumOfRemovedPiece] = null;
    }
  }
  console.log(BOARD_STATE);
};

const removePieceAfterJump = () => {
  if (selectedPiece.jumpPieceID) {
    const pieceToRemove = document.querySelector(`#${selectedPiece.jumpPieceID}`) as HTMLElement;
    pieceToRemove.remove();
  }
};

const setValidMoves = () => {
  const PIECE_INDEX = selectedPiece.index;
  const LIGHT = "light";

  const checkForEmptySquare = (num: number) => {
    if (PIECE_INDEX + num < 0 || PIECE_INDEX + num > 63) return;

    if (BOARD_STATE[PIECE_INDEX + num] == null && 
      squares[PIECE_INDEX + num].firstElementChild == null) {
      return true;
    } else return false;
  };

  const checkForLightColoredSquare = (num: number) => {
    if (squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT) {
      return true;
    } else {
      return false;
    }
  };

  const checkForOpponentJump = (): boolean => {  
    let canPieceJump = false;

    if (currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX + 14] == null &&
        PIECE_INDEX + 14 < 63 &&
        squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") === PLAYER.BLUE) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        canPieceJump = true;
      } 
      
      if (BOARD_STATE[PIECE_INDEX + 18] == null &&
        PIECE_INDEX + 18 < 63 &&
        squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") === PLAYER.BLUE) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 9];
        canPieceJump = true;
      }
    } 

    if (currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX - 14] == null &&
        PIECE_INDEX - 14 > 0 &&
        squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 7];
        canPieceJump = true;
      } 

      if (BOARD_STATE[PIECE_INDEX - 18] == null &&
        PIECE_INDEX - 18 > 0 &&
        squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        console.log("jump at -18");
        toggleValidMoveSquare(squares[PIECE_INDEX - 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 9];
        canPieceJump = true;
      } 
    }
    
    if (selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX + 14] == null &&
        PIECE_INDEX + 14 < 63 &&
        squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") !== currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        canPieceJump = true;
      } else if (BOARD_STATE[PIECE_INDEX + 18] == null &&
        PIECE_INDEX + 18 < 63 &&
        squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") !== currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 9];
        canPieceJump = true;
      } else if (BOARD_STATE[PIECE_INDEX - 14] == null &&
        PIECE_INDEX - 14 > 0 &&
        squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 7];
        canPieceJump = true;
      } else if (BOARD_STATE[PIECE_INDEX - 18] == null &&
        PIECE_INDEX - 18 > 0 &&
        squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        console.log("jump at -18");
        toggleValidMoveSquare(squares[PIECE_INDEX - 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 9];
        canPieceJump = true;
      } 
    }
    return canPieceJump ? true : false;
  };

  if (currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing || 
    selectedPiece.isPieceKing) {
    if (checkForEmptySquare(7) && checkForLightColoredSquare(7)) { 
      PIECE_INDEX + 7 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 7]);
      PIECE_INDEX + 7 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 7], MOVE.ENABLE);
    }
    if (checkForEmptySquare(9) && checkForLightColoredSquare(9)) {
      PIECE_INDEX + 9 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 9]);
      PIECE_INDEX + 9 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 9], MOVE.ENABLE);
    }
  } 

  if (currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing || 
      selectedPiece.isPieceKing) {
    if (checkForEmptySquare(-7) && checkForLightColoredSquare(-7)) {
      PIECE_INDEX - 7 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 7]);
      PIECE_INDEX - 7 > 0 && toggleMoveToSquareHandler(squares[PIECE_INDEX - 7], MOVE.ENABLE);
    }
    if (checkForEmptySquare(-9) && checkForLightColoredSquare(-9)) {
      PIECE_INDEX - 9 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 9]);
      PIECE_INDEX - 9 > 0 && toggleMoveToSquareHandler(squares[PIECE_INDEX - 9], MOVE.ENABLE);
    }
  }


  if (selectedPiece.firstMove) {
    checkForOpponentJump();
  } else if (!selectedPiece.firstMove && !checkForOpponentJump()) {
    console.log("no more jumps. Change player");
    resetSettings();
  } else if (!selectedPiece.firstMove && checkForOpponentJump()) {
    console.log("another jump available!");
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
  if (currentPlayer === PLAYER.RED) {
    initPlayerPieces(PLAYER.BLUE);
    bluePlayerElement.classList.add("player-turn");
    redPlayerElement.classList.remove("player-turn");
  }
  else {
    initPlayerPieces(PLAYER.RED);
    redPlayerElement.classList.add("player-turn");
    bluePlayerElement.classList.remove("player-turn");
  }
};

const removeValidDrops = () => {
  const listenerElements = [...document.querySelectorAll(".valid-drop")];
  listenerElements.forEach(element => toggleValidMoveSquare(element));
  toggleMoveToSquareHandler(listenerElements, MOVE.RESET);
};

const appendScoreToDOM = () => {
  redScoreElement.textContent = redPlayerPieces.toString();
  blueScoreElement.textContent = bluePlayerPieces.toString();
};

const resetSettings = () => {
  removeValidDrops();
  resetSelectedPiece();
  changePlayerTurn();
};

const updatePlayerCount = () => {
  if (currentPlayer === PLAYER.RED) {
    --bluePlayerPieces;
  } else if (currentPlayer === PLAYER.BLUE) {
    --redPlayerPieces;
  }
};

const checkIsPieceKing = (): boolean => {
  let isKing = false;
  if (currentPlayer === PLAYER.BLUE) {
    BOARD_STATE.slice(0, 8).find(piece => {
      if (piece?.includes("f") || piece?.includes("g") || piece?.includes("h")) {
        setPieceToKing(piece);
        isKing = true;
      }
    });
  } else if (currentPlayer === PLAYER.RED) {
    BOARD_STATE.slice(56, 63).find(piece => {
      if (piece?.includes("a") || piece?.includes("b") || piece?.includes("c")) {
        setPieceToKing(piece);
        isKing = true;
      }
    });
  } else isKing = false;
  return isKing;
};

const setPieceToKing = (piece: string) => {
  const kingPiece = document.querySelector(`#${piece}`);
  if (kingPiece) {
    kingPiece.classList.add("king");
    const kingChildElement = document.createElement("div");
    kingChildElement.textContent = "K";
    kingPiece.appendChild(kingChildElement);
  }
};

const shouldPieceBeRemoved = (id: string) => {
  const indexDifference = Math.abs(parseInt(id) - selectedPiece.index);
  // piece jumped other player's piece
  removeValidDrops();

  if (indexDifference > 9) {
    selectedPiece.firstMove = false;
    removePieceAfterJump();
    updatePlayerCount();
    appendScoreToDOM();
    if (checkIsPieceKing()) {
      resetSettings();
    } else {
      setCurrentPieceHandler(selectedPiece.id);
    }
  } else {
    checkIsPieceKing();
    resetSettings();
  }
};

const movePieceWithClickHandler = (event: Event) => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  const currentTarget = <Element>event.currentTarget;
  const targetID = (<HTMLElement>event.target).id;
  activePiece.remove();
  currentTarget.appendChild(activePiece);
  updateBoardState(parseInt(targetID));
  shouldPieceBeRemoved(currentTarget.id);
};

initPlayerPieces(PLAYER.RED);
appendScoreToDOM();