import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/dom";

import appendScoreToDOM from "../ts/appendScoreToDOM";
import initPlayerPieces from "../ts/initPlayerPieces";
import setCurrentPieceHandler from "../ts/setCurrentPieceHandler";
import shouldPieceBeRemoved from "../ts/shouldPieceBeRemoved";
import updateBoardState from "../ts/updateBoardState";
import { gameControl } from "../ts/control";
import { mockFullBoard } from "../../setupTests";

jest.mock("../ts/shouldPieceBeRemoved", () => jest.fn());
jest.mock("../ts/updateBoardState", () => jest.fn());

describe("movePieceWithClickHandler", () => {
    afterEach(() => jest.clearAllMocks());

    document.body.appendChild(mockFullBoard);

    test("movePieceWithClickHandler moves piece and calls functions", () => {
        const { getAllByRole, getByTestId } = within(mockFullBoard);

        initPlayerPieces(gameControl.currentPlayer, setCurrentPieceHandler);
        appendScoreToDOM();

        const redBtn9 = getAllByRole("button")[9];

        userEvent.click(redBtn9);
        userEvent.click(getByTestId("24"));

        expect(shouldPieceBeRemoved).toHaveBeenCalledTimes(1);
        expect(shouldPieceBeRemoved).toHaveBeenCalledWith("24");
        expect(updateBoardState).toHaveBeenCalledTimes(1);
        expect(updateBoardState).toHaveBeenCalledWith(24);
        expect(getByTestId("17")).not.toContainElement(redBtn9);
        expect(getByTestId("24")).toContainElement(redBtn9);
    });
});