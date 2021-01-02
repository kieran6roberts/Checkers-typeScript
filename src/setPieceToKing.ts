const setPieceToKing = (piece: string) => {
  const kingPiece = document.querySelector(`#${piece}`);
  if (kingPiece && !kingPiece.classList.contains("king")) {
    kingPiece.classList.add("king");
    const kingChildElement = document.createElement("div");
    kingChildElement.textContent = "K";
    kingPiece.appendChild(kingChildElement);
  }
};

export default setPieceToKing;