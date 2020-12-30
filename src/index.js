var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
var redPieces = __spreadArrays(document.querySelectorAll("[data-color='red']"));
var bluePieces = __spreadArrays(document.querySelectorAll("[data-color='blue']"));
var squares = __spreadArrays(document.querySelectorAll(".square"));
var redPlayerElement = document.querySelector(".scoreboard__red");
var bluePlayerElement = document.querySelector(".scoreboard__blue");
var redScoreElement = document.querySelector(".scoreboard__red-score");
var blueScoreElement = document.querySelector(".scoreboard__blue-score");
var MOVE;
(function (MOVE) {
  MOVE["ENABLE"] = "enable";
  MOVE["RESET"] = "reset";
})(MOVE || (MOVE = {}));
var PLAYER;
(function (PLAYER) {
  PLAYER["RED"] = "red";
  PLAYER["BLUE"] = "blue";
})(PLAYER || (PLAYER = {}));
var BOARD_STATE = [
  null, "a2", null, "a4", null, "a6", null, "a8",
  "b1", null, "b3", null, "b5", null, "b7", null,
  null, "c2", null, "c4", null, "c6", null, "c8",
  null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null,
  "f1", null, "f3", null, "f5", null, "f7", null,
  null, "g2", null, "g4", null, "g6", null, "g8",
  "h1", null, "h3", null, "h5", null, "h7", null,
];
var currentPlayer;
var redPlayerPieces = 12;
var bluePlayerPieces = 12;
var selectedPiece = {
  id: "-1",
  index: -1,
  isPieceKing: false,
  jumpPieceID: null,
  firstMove: true
};
var resetSelectedPiece = function () {
  selectedPiece.id = "-1";
  selectedPiece.index = -1;
  selectedPiece.isPieceKing = false;
  selectedPiece.jumpPieceID = null;
  selectedPiece.firstMove = true;
};
var setCurrentPieceHandler = function (event) {
  var activePieceID;
  if (typeof event === "string") {
    activePieceID = event;
  }
  else {
    activePieceID = event.target.id;
  }
  var activePieceBoardPosition = BOARD_STATE.indexOf(activePieceID);
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
var addListenersToPieces = function (player1, player2) {
  player1.forEach(function (piece) { return piece.addEventListener("click", setCurrentPieceHandler); });
  player2.forEach(function (piece) { return piece.removeEventListener("click", setCurrentPieceHandler); });
};
var initPlayerPieces = function (player) {
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
  else
    throw new Error("no valid player selecetd");
};
var toggleMoveToSquareHandler = function (element, mode) {
  if (Array.isArray(element)) {
    element.forEach(function (el) { return el.removeEventListener("click", movePieceWithClickHandler); });
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
    else
      throw new Error("no move is defined!");
  }
};
var toggleValidMoveSquare = function (element) {
  element.classList.toggle("valid-drop");
};
var updateBoardState = function (newState) {
  BOARD_STATE[newState] = selectedPiece.id;
  BOARD_STATE[selectedPiece.index] = null;
  if (selectedPiece.jumpPieceID != null) {
    var removalIndex = BOARD_STATE.indexOf(selectedPiece.jumpPieceID);
    BOARD_STATE[removalIndex] = null;
  }
};
var removePieceAfterJump = function () {
  if (selectedPiece.jumpPieceID != null) {
    var pieceToRemove = document.querySelector("#" + selectedPiece.jumpPieceID);
    pieceToRemove.remove();
  }
};
var setValidMoves = function () {
  var PIECE_INDEX = selectedPiece.index;
  var LIGHT = "light";
  var checkForEmptySquare = function (num) {
    if (BOARD_STATE[PIECE_INDEX + num] == null && !squares[PIECE_INDEX + num].hasChildNodes()) {
      return true;
    }
    else
      return false;
  };
  var checkForLightColoredSquare = function (num) { return squares[PIECE_INDEX + num].getAttribute("data-color") === LIGHT ? true : false; };
  var checkForOpponentJump = function () {
    var _a, _b, _c, _d;
    switch (currentPlayer) {
    case PLAYER.RED:
      if (((_a = squares[PIECE_INDEX + 7].firstElementChild) === null || _a === void 0 ? void 0 : _a.getAttribute("data-color")) === PLAYER.BLUE &&
                    BOARD_STATE[PIECE_INDEX + 14] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 7];
        return true;
      }
      else if (((_b = squares[PIECE_INDEX + 9].firstElementChild) === null || _b === void 0 ? void 0 : _b.getAttribute("data-color")) === PLAYER.BLUE &&
                    BOARD_STATE[PIECE_INDEX + 18] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX + 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX + 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX + 9];
        return true;
      }
      else
        return false;
    case PLAYER.BLUE:
      if (((_c = squares[PIECE_INDEX - 7].firstElementChild) === null || _c === void 0 ? void 0 : _c.getAttribute("data-color")) === PLAYER.RED &&
                    BOARD_STATE[PIECE_INDEX - 14] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 14]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 14], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 7];
        return true;
      }
      else if (((_d = squares[PIECE_INDEX - 9].firstElementChild) === null || _d === void 0 ? void 0 : _d.getAttribute("data-color")) === PLAYER.RED &&
                    BOARD_STATE[PIECE_INDEX - 18] == null) {
        toggleValidMoveSquare(squares[PIECE_INDEX - 18]);
        toggleMoveToSquareHandler(squares[PIECE_INDEX - 18], MOVE.ENABLE);
        selectedPiece.jumpPieceID = BOARD_STATE[PIECE_INDEX - 9];
        return true;
      }
      else
        return false;
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
  if (!selectedPiece.firstMove && checkForOpponentJump()) {
    checkForOpponentJump();
  }
  else if (!selectedPiece.firstMove && !checkForOpponentJump()) {
    resetSettings();
    return;
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
var changePlayerTurn = function () {
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
var removeValidDrops = function () {
  var listenerElements = document.querySelectorAll(".valid-drop");
  listenerElements.forEach(function (element) { return toggleValidMoveSquare(element); });
  toggleMoveToSquareHandler(__spreadArrays(listenerElements), MOVE.RESET);
};
var appendScoreToDOM = function () {
  redScoreElement.textContent = redPlayerPieces.toString();
  blueScoreElement.textContent = bluePlayerPieces.toString();
};
var resetSettings = function () {
  removeValidDrops();
  resetSelectedPiece();
  changePlayerTurn();
};
var updatePlayerCount = function () {
  if (currentPlayer === PLAYER.RED) {
    bluePlayerPieces = --bluePlayerPieces;
  }
  else if (currentPlayer === PLAYER.BLUE) {
    redPlayerPieces = --redPlayerPieces;
  }
};
var shouldPieceBeRemoved = function (id) {
  var indexDifference = Math.abs(parseInt(id) - selectedPiece.index);
  // piece jumped other player's piece
  if (indexDifference > 9) {
    selectedPiece.firstMove = false;
    removePieceAfterJump();
    updatePlayerCount();
    appendScoreToDOM();
    removeValidDrops();
    setCurrentPieceHandler(selectedPiece.id);
  }
  else {
    resetSettings();
  }
};
var movePieceWithClickHandler = function (event) {
  var activePiece = document.querySelector("#" + selectedPiece.id);
  var currentTarget = event.currentTarget;
  var targetID = event.target.id;
  activePiece.remove();
  currentTarget.appendChild(activePiece);
  updateBoardState(parseInt(targetID));
  shouldPieceBeRemoved(currentTarget.id);
};
initPlayerPieces(PLAYER.RED);
appendScoreToDOM();
