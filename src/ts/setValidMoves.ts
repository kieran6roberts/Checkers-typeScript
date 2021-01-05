import { BOARD_STATE,
  CLASS,
  gameControl,
  MOVE,
  PLAYER,
  selectedPiece } from "./control";
import toggleMoveToSquareHandler from "./toggleMoveToSquareHandler";
import toggleValidMoveSquare from "./toggleValidMoveSquare";
import movePieceWithClickHandler from "./movePieceWithClickHandler";
import changePlayerTurn from "./changePlayerTurn";

const squaresElements = document.querySelectorAll(".square");
const squares = Array.from(squaresElements);

const setValidMoves = (): void => {
  const PIECE_INDEX = selectedPiece.index;
  const LIGHT = "light";
  
  const checkForEmptySquare = (num: number): boolean => {
    if (PIECE_INDEX + num < 0 || PIECE_INDEX + num > 63) return false;
  
    if (BOARD_STATE[PIECE_INDEX + num] == null && 
        squares[PIECE_INDEX + num].firstElementChild == null) {
      return true;
    } else return false;
  };
  
  const checkForLightColoredSquare = (num: number) => squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT ? true : false;

  const checkForPieceJump = (jumpPosition: number, player: PLAYER): boolean => {
    if (BOARD_STATE[PIECE_INDEX + jumpPosition] == null &&
        (PIECE_INDEX + jumpPosition < 63 || PIECE_INDEX + jumpPosition > 0 ) &&
        checkForLightColoredSquare(jumpPosition) &&
        squares[PIECE_INDEX + (jumpPosition / 2)].firstElementChild && 
        squares[PIECE_INDEX + (jumpPosition / 2)].firstElementChild?.getAttribute("data-color") === player) {
          
          toggleValidMoveSquare(squares[PIECE_INDEX + jumpPosition], CLASS.ADD);
          toggleMoveToSquareHandler(squares[PIECE_INDEX + jumpPosition], MOVE.ENABLE, movePieceWithClickHandler);
          selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + (jumpPosition / 2)];
          return true;
    } else return false;
};

  const checkForKingPieceJump = (jumpPosition: number, limit: number) => {
    if (BOARD_STATE[PIECE_INDEX + jumpPosition] == null &&
        PIECE_INDEX + jumpPosition < limit || PIECE_INDEX + jumpPosition > limit &&
        squares[PIECE_INDEX + (jumpPosition / 2)].firstElementChild &&
        squares[PIECE_INDEX + (jumpPosition / 2)].firstElementChild?.getAttribute("data-color") !== gameControl.currentPlayer) {

          toggleValidMoveSquare(squares[PIECE_INDEX + jumpPosition], CLASS.ADD);
          toggleMoveToSquareHandler(squares[PIECE_INDEX + jumpPosition], MOVE.ENABLE, movePieceWithClickHandler);
          selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + (jumpPosition / 2)];
          return true;
        } else return false;
  };
  
  const checkForOpponentJump = (): boolean => {  
    let canPieceJump = false;
  
    if (gameControl.currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing) {
      if (checkForPieceJump(14, PLAYER.BLUE) || checkForPieceJump(18, PLAYER.BLUE)) {
        canPieceJump = true;
      } 
    } 
  
    if (gameControl.currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing) {
      if (checkForPieceJump(-14, PLAYER.RED) || checkForPieceJump(-18, PLAYER.RED)) {
        canPieceJump = true;
      } 
    }
      
    if (selectedPiece.isPieceKing) {
      if (checkForKingPieceJump(14, 63) || checkForKingPieceJump(18, 63) || checkForKingPieceJump(-14, 0) || checkForKingPieceJump(-18, 0)) {
        canPieceJump = true;
      } 
    }
    return canPieceJump;
  };
  
  if (gameControl.currentPlayer === PLAYER.RED && !selectedPiece.isPieceKing && selectedPiece.firstMove || 
      selectedPiece.isPieceKing && selectedPiece.firstMove) {
    if (checkForEmptySquare(7) && checkForLightColoredSquare(7)) { 
      PIECE_INDEX + 7 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 7], CLASS.ADD);
      PIECE_INDEX + 7 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 7], MOVE.ENABLE, movePieceWithClickHandler);
    }
    if (checkForEmptySquare(9) && checkForLightColoredSquare(9)) {
      PIECE_INDEX + 9 < 63 && toggleValidMoveSquare(squares[PIECE_INDEX + 9], CLASS.ADD);
      PIECE_INDEX + 9 < 63 && toggleMoveToSquareHandler(squares[PIECE_INDEX + 9], MOVE.ENABLE, movePieceWithClickHandler);
    }
  } 
  
  if (gameControl.currentPlayer === PLAYER.BLUE && !selectedPiece.isPieceKing && selectedPiece.firstMove || 
        selectedPiece.isPieceKing && selectedPiece.firstMove) {
    if (checkForEmptySquare(-7) && checkForLightColoredSquare(-7)) {
      PIECE_INDEX - 7 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 7], CLASS.ADD);
      PIECE_INDEX - 7 > 0 && toggleMoveToSquareHandler(squares[PIECE_INDEX - 7], MOVE.ENABLE, movePieceWithClickHandler);
    }
    if (checkForEmptySquare(-9) && checkForLightColoredSquare(-9)) {
      PIECE_INDEX - 9 > 0 && toggleValidMoveSquare(squares[PIECE_INDEX - 9], CLASS.ADD);
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