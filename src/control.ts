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

enum PLAYER { 
    RED = "red",
    BLUE ="blue"
}

enum MOVE { 
    ENABLE = "enable", 
    RESET = "reset" 
  }
  
type ELEMENTS = Element | Element[];

type CONTROL = {
    currentPlayer: PLAYER,
    redPlayerPieces: number,
    bluePlayerPieces: number
}

let gameControl: CONTROL = {
  currentPlayer: PLAYER.RED,
  redPlayerPieces: 12,
  bluePlayerPieces: 12
};

type SELECTED_PIECE = {
    id: string,
    index: number,
    isPieceKing: boolean,
    jumpPieceID: string | null
    firstMove: boolean
  };

let selectedPiece: SELECTED_PIECE = {
  id: "-1",
  index: -1,
  isPieceKing: false,
  jumpPieceID: null,
  firstMove: true
};

export {
  BOARD_STATE,
  CONTROL,
  gameControl,
  ELEMENTS,
  selectedPiece,
  PLAYER,
  MOVE,
};