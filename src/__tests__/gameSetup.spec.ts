import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import appendScoreToDOM from "../ts/appendScoreToDOM";
import setCurrentPieceHandler from "../ts/setCurrentPieceHandler";
import initPlayerPieces from "../ts/initPlayerPieces";
import { gameControl } from "../ts/control";
import { mockFullBoard } from "../../setupTests";

jest.mock("../ts/setCurrentPieceHandler", () => jest.fn());

describe("game begins with score update and red player pieces init", () => {
  afterEach(() => jest.clearAllMocks());

  document.body.appendChild(mockFullBoard);

  test("correct pieces initialised and score displays", () => {
    initPlayerPieces(gameControl.currentPlayer, setCurrentPieceHandler);
    appendScoreToDOM();

    const { getAllByText, getAllByRole } = within(mockFullBoard);

    expect(getAllByText("12")[0]).toBeInTheDocument();
    expect(getAllByText("12")[1]).toBeInTheDocument();
    
    userEvent.click(getAllByRole("button")[24]);
    
    // not blue players turn
    expect(setCurrentPieceHandler).not.toHaveBeenCalled();
    
    userEvent.click(getAllByRole("button")[1]);

    // red players turn
    expect(setCurrentPieceHandler).toHaveBeenCalledTimes(1);
  });
});