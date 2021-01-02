import shouldPieceBeRemoved from "./shouldPieceBeRemoved";
import updateBoardState from "./updateBoardState";
import { selectedPiece } from "./control";

const movePieceWithClickHandler = (event: Event): void => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  activePiece.remove();
  (<Element>event.currentTarget).appendChild(activePiece);
  
  updateBoardState(parseInt((<HTMLElement>event.target).id));
  shouldPieceBeRemoved((<Element>event.currentTarget).id);
};

export default movePieceWithClickHandler;