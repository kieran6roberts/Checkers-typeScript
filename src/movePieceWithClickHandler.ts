import updateBoardState from "./updateBoardState";
import { selectedPiece } from "./index";

const movePieceWithClickHandler = (event: Event) => {
  const activePiece = document.querySelector(`#${selectedPiece.id}`) as HTMLElement;
  const currentTarget = <Element>event.currentTarget;
  const targetID = (<HTMLElement>event.target).id;
  activePiece.remove();
  currentTarget.appendChild(activePiece);
  updateBoardState(parseInt(targetID));
  shouldPieceBeRemoved(currentTarget.id);
};

export default movePieceWithClickHandler;