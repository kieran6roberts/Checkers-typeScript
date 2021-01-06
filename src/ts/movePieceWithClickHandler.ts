import shouldPieceBeRemoved from "./shouldPieceBeRemoved";
import updateBoardState from "./updateBoardState";
import { BOARD_STATE, selectedPiece } from "./control";

const movePieceWithClickHandler = (event: Event): void => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLButtonElement;
  const target = event.target as HTMLDivElement;
  if (activePiece?.parentElement?.id) {
    const jumpPosition = parseInt(activePiece?.parentElement?.id) - parseInt(target.id);
    selectedPiece.jumpPieceID = BOARD_STATE[selectedPiece.index - (jumpPosition / 2)];
  }
  activePiece ? activePiece.remove() : null;
  target.appendChild(activePiece);
  updateBoardState(parseInt(target.id));
  shouldPieceBeRemoved(target.id);
};

export default movePieceWithClickHandler;