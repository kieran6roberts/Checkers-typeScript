import removeValidDrops from "./removeValidDrops";
import setValidMoves from "./setValidMoves";
import { selectedPiece, BOARD_STATE } from "./index";

const setCurrentPieceHandler = (event: Event | string) => {
  let activePieceID: any;
  if (typeof event === "string") { 
    if (event !== selectedPiece.id) {
      removeValidDrops();
    }
    activePieceID = event;
  } else {
    if ((<HTMLElement>event.target).id !== selectedPiece.id) {
      removeValidDrops();
    }
  
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
  
  setValidMoves();
};

export default setCurrentPieceHandler;