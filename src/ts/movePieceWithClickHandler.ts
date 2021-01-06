import shouldPieceBeRemoved from "./shouldPieceBeRemoved";
import updateBoardState from "./updateBoardState";
import { selectedPiece } from "./control";

const movePieceWithClickHandler = (event: Event): void => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLButtonElement;
  const target = event.target as HTMLDivElement;
  activePiece ? activePiece.remove() : null;
  target.appendChild(activePiece);
  updateBoardState(parseInt(target.id));
  shouldPieceBeRemoved(target.id);
};

export default movePieceWithClickHandler;