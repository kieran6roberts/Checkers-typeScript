const pieces = [...document.querySelectorAll(".piece")];
const squares = [...document.querySelectorAll(".square")];

/* start the drag on the game piece */
const dragStartHandler = event => {
    console.log(event.target);
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.dropEffect = "move";
    event.target.classList.add("fade");
};

/* drag over valid square */
const dragOverHandler = event => {
    event.preventDefault();
    event.target.classList.add("overSquare");
};
/* leave valid drag square */
const dragLeaveHandler = event => {
    event.target.classList.remove("overSquare");
};



/* handle the drop */
const dropHandler = event => {
    event.preventDefault();
    const { currentTarget } = event;
    // check if square already has piece on it
    if (event.currentTarget.hasChildNodes()) return;

    try {
        const id  = event.dataTransfer.getData("text");
        const dragEl = document.querySelector(`#${id}`);
        currentTarget.appendChild(dragEl);
        currentTarget.classList.remove("overSquare");
    } catch (err) {
        throw new Error(err);
    }
};

/* end the drop for the game piece */
const dragEndHandler = ({ target }) => {
    target.classList.remove("fade");
};

export const dragInit = () => {
    pieces.forEach( piece => piece.addEventListener("dragstart", dragStartHandler));
    pieces.forEach( piece => piece.addEventListener("dragend", dragEndHandler));
    
    squares.forEach( square => square.addEventListener("dragover", dragOverHandler));
    squares.forEach( square => square.addEventListener("dragleave", dragLeaveHandler));
    squares.forEach( square => square.addEventListener("drop", dropHandler));
};
