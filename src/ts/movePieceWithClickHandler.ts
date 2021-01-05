import shouldPieceBeRemoved from "./shouldPieceBeRemoved";
import updateBoardState from "./updateBoardState";
import { selectedPiece } from "./control";

const movePieceWithClickHandler = (event: Event): void => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLButtonElement;
  const currentTarget = event.currentTarget as HTMLDivElement;
  const target = event.target as HTMLDivElement;
  activePiece ? activePiece.remove() : null;
  currentTarget.appendChild(activePiece);
  updateBoardState(parseInt(target.id));
  shouldPieceBeRemoved(currentTarget.id);
};

export default movePieceWithClickHandler;