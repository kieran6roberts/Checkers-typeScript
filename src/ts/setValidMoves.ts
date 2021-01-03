import { BOARD_STATE,
  gameControl,
  MOVE,
  PLAYER,
  selectedPiece } from "./control";
import toggleMoveToSquareHandler from "./toggleMoveToSquareHandler";
import toggleValidMoveSquare from "./toggleValidMoveSquare";
import movePieceWithClickHandler from "./movePieceWithClickHandler";
import changePlayerTurn from "./changePlayerTurn";

const setValidMoves = (): void => {
  const squaresElements = document.querySelectorAll(".square");
  const squares = Array.from(squaresElements);
  const PIECE_INDEX = selectedPiece.index;
  const LIGHT = "light";
  
  const checkForEmptySquare = (num: number): boolean | undefined => {
    if (PIECE_INDEX + num < 0 || PIECE_INDEX + num > 63) return;
  
    if (BOARD_STATE[PIECE_INDEX + num] == null && 
        squares[PIECE_INDEX + num].firstElementChild == null) {
      return true;
    } else false;
  };
  
  const checkForLightColoredSquare = (num: number) => squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT ? true : false;
  
  const checkForOpponentJump = (): boolean => {  
    let canPieceJump = false;
  
    if (gameControl.currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX + 14] == null &&
          PIECE_INDEX + 14 < 63 &&
          checkForLightColoredSquare(14) &&
          squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") === PLAYER.BLUE) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        canPieceJump = true;
      } 
        
      if (BOARD_STATE[PIECE_INDEX + 18] == null &&
          PIECE_INDEX + 18 < 63 &&
          checkForLightColoredSquare(18) &&
          squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") === PLAYER.BLUE) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 9];
        canPieceJump = true;
      }
    } 
  
    if (gameControl.currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX - 14] == null &&
          PIECE_INDEX - 14 > 0 &&
          checkForLightColoredSquare(-14) &&
          squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 7];
        canPieceJump = true;
      } 
  
      if (BOARD_STATE[PIECE_INDEX - 18] == null &&
          PIECE_INDEX - 18 > 0 &&
          checkForLightColoredSquare(-18) &&
          squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") === PLAYER.RED) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 18], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 9];
        canPieceJump = true;
      } 
    }
      
    if (selectedPiece.isPieceKing) {
      if (BOARD_STATE[PIECE_INDEX + 14] == null &&
          PIECE_INDEX + 14 < 63 &&
          squares[PIECE_INDEX + 7].firstElementChild &&
          squares[PIECE_INDEX + 7].firstElementChild?.getAttribute("data-color") !== gameControl.currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        canPieceJump = true;
      } 
      if (BOARD_STATE[PIECE_INDEX + 18] == null &&
          PIECE_INDEX + 18 < 63 &&
          squares[PIECE_INDEX + 9].firstElementChild &&
          squares[PIECE_INDEX + 9].firstElementChild?.getAttribute("data-color") !== gameControl.currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 9];
        canPieceJump = true;
      } 
      if (BOARD_STATE[PIECE_INDEX - 14] == null &&
          PIECE_INDEX - 14 > 0 &&
          squares[PIECE_INDEX - 7].firstElementChild &&
          squares[PIECE_INDEX - 7].firstElementChild?.getAttribute("data-color") !== gameControl.currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 7];
        canPieceJump = true;
      } 
      if (BOARD_STATE[PIECE_INDEX - 18] == null &&
          PIECE_INDEX - 18 > 0 &&
          squares[PIECE_INDEX - 9].firstElementChild &&
          squares[PIECE_INDEX - 9].firstElementChild?.getAttribute("data-color") !== gameControl.currentPlayer) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 18], "add");
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE, movePieceWithClickHandler);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 9];
        canPieceJump = true;
      } 
    }
    return canPieceJump ? true : false;
  };
  
  if (gameControl.currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing && selectedPiece.firstMove || 
      selectedPiece.isPieceKing && selectedPiece.firstMove) {
    if (checkForEmptySquare(7) && checkForLightColoredSquare(7)) { 
      PIECE_INDEX + 7 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 7], "add");
      PIECE_INDEX + 7 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 7], MOVE.ENABLE, movePieceWithClickHandler);
    }
    if (checkForEmptySquare(9) && checkForLightColoredSquare(9)) {
      PIECE_INDEX + 9 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 9], "add");
      PIECE_INDEX + 9 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 9], MOVE.ENABLE, movePieceWithClickHandler);
    }
  } 
  
  if (gameControl.currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing && selectedPiece.firstMove || 
        selectedPiece.isPieceKing && selectedPiece.firstMove) {
    if (checkForEmptySquare(-7) && checkForLightColoredSquare(-7)) {
      PIECE_INDEX - 7 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 7], "add");
      PIECE_INDEX - 7 > 0 && toggleMoveToSquareHandler(squares[PIECE_INDEX - 7], MOVE.ENABLE, movePieceWithClickHandler);
    }
    if (checkForEmptySquare(-9) && checkForLightColoredSquare(-9)) {
      PIECE_INDEX - 9 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 9], "add");
      PIECE_INDEX - 9 > 0 && toggleMoveToSquareHandler(squares[PIECE_INDEX - 9], MOVE.ENABLE, movePieceWithClickHandler);
    }
  }
  
  if (selectedPiece.firstMove || !selectedPiece.firstMove && checkForOpponentJump()) {
    checkForOpponentJump();
  } else if (!selectedPiece.firstMove && !checkForOpponentJump()) {
    changePlayerTurn();
  }
};

export default setValidMoves;