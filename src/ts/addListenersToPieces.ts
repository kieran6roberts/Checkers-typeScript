const addListenersToPieces = (player1: Element[], player2: Element[], callback: any): void => {
  player1.forEach(piece => piece && piece.addEventListener("click", callback));
  player2.forEach(piece => piece && piece.removeEventListener("click", callback));
};

export default addListenersToPieces;