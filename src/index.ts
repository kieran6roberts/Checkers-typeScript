const redPieces = [...document.querySelectorAll("[data-color='red']")];
const bluePieces = [...document.querySelectorAll("[data-color='blue']")];
const squares = [...document.querySelectorAll(".square")];

type PLAYERS = "red" | "blue";

const PLAYER1 = "red";
const PLAYER2 = "blue";


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
  moveToSeventh: false,
  moveToNinth: false,
  moveToFourteenth: false,
  moveToEighteenth: false,
  moveToMinusSeventh: false,
  moveToMinusNinth: false,
  moveToMinusFourteenth: false,
  moveToMinusEighteenth: false,
};

const setCurrentPieceHandler = (event: Event) => {
  const activePieceID = (<HTMLElement>event.target).id;
  const activePieceBoardPosition = BOARD_STATE.indexOf(activePieceID);
  selectedPiece.id = activePieceID;
  selectedPiece.index = activePieceBoardPosition;
  setValidMoves();

};

const initPlayerPieces = (player: PLAYERS) => {
  console.log("init player pieces");
  if (player === PLAYER1) {
    redPieces.forEach(piece => piece.addEventListener("click", event => setCurrentPieceHandler(event)));
    //redPieces.forEach(piece => piece.addEventListener("dragstart", event => setCurrentPieceHandler(event)));
  }
  else if (player === PLAYER2) {
    bluePieces.forEach(piece => piece.addEventListener("click", event => setCurrentPieceHandler(event)));
    //bluePieces.forEach(piece => piece.addEventListener("dragstart", event => setCurrentPieceHandler(event)));
  }
};

const toggleValidMoveSquare = (element: Element): void => {
  element.classList.add("valid-drop");
};

const setValidMoves = (): void => {
  const pIndex = selectedPiece.index;
  if (BOARD_STATE[pIndex + 7] === null) {
    selectedPiece.moveToSeventh = true;
    console.log(squares[pIndex + 7]);
    toggleValidMoveSquare(squares[pIndex + 7]);
  }
  if (BOARD_STATE[pIndex + 9] === null) {
    selectedPiece.moveToNinth = true;
    console.log(squares[pIndex + 9]);
    toggleValidMoveSquare(squares[pIndex + 9]);
  }
  if (BOARD_STATE[pIndex - 7] === null) {
    selectedPiece.moveToNinth = true;
    console.log(squares[pIndex - 7]);
    toggleValidMoveSquare(squares[pIndex - 7]);
  }
  if (BOARD_STATE[pIndex - 9] === null) {
    selectedPiece.moveToNinth = true;
    console.log(squares[pIndex - 9]);
    toggleValidMoveSquare(squares[pIndex - 9]);
  }

  console.log(selectedPiece);
};

const movePieceHandler = () => {

};

initPlayerPieces(PLAYER1);