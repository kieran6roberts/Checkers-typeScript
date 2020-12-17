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
var PLAYER1 = "red";
var PLAYER2 = "blue";
var MOVE_ENABLE = "enable";
var MOVE_RESET = "reset";
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
var selectedPiece = {
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
    moveToMinusEighteenth: false
};
var setCurrentPieceHandler = function (event) {
    var activePieceID = event.target.id;
    var activePieceBoardPosition = BOARD_STATE.indexOf(activePieceID);
    selectedPiece.id = activePieceID;
    selectedPiece.index = activePieceBoardPosition;
    setValidMoves();
};
var initPlayerPieces = function (player) {
    console.log("init player pieces");
    if (player === PLAYER1) {
        redPieces.forEach(function (piece) { return piece.addEventListener("click", function (event) { return setCurrentPieceHandler(event); }); });
        //redPieces.forEach(piece => piece.addEventListener("dragstart", event => setCurrentPieceHandler(event)));
    }
    else if (player === PLAYER2) {
        bluePieces.forEach(function (piece) { return piece.addEventListener("click", function (event) { return setCurrentPieceHandler(event); }); });
        //bluePieces.forEach(piece => piece.addEventListener("dragstart", event => setCurrentPieceHandler(event)));
    }
};
var enableMoveToSquareHandler = function (element, mode) {
    if (mode === MOVE_ENABLE) {
        element.addEventListener("click", movePieceHandler);
        element.addEventListener("click", movePieceHandler);
    }
    else if (mode === MOVE_RESET) {
        element.removeEventListener("click", movePieceHandler);
        element.removeEventListener("click", movePieceHandler);
    }
};
var toggleValidMoveSquare = function (element) {
    element.classList.add("valid-drop");
};
var setValidMoves = function () {
    var pIndex = selectedPiece.index;
    if (BOARD_STATE[pIndex + 7] === null) {
        var validElement = squares[pIndex + 7];
        selectedPiece.moveToSeventh = true;
        console.log(squares[pIndex + 7]);
        toggleValidMoveSquare(validElement);
        enableMoveToSquareHandler(validElement, MOVE_ENABLE);
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
var movePieceHandler = function (event) {
    console.log("moved piece");
    console.log(event.target);
};
initPlayerPieces(PLAYER1);
