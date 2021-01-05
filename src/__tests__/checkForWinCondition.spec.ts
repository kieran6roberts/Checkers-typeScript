import { within } from "@testing-library/dom";

import checkForWinCondition from "../ts/checkForWinCondition";
import { mockFullBoard } from "../../setupTests";

describe("check for winner", () => {
    document.body.appendChild(mockFullBoard);

    test("player pieces is 0 meaning win!", () => {
        const playerPieces = {
            pieces: 1
        };

        const { getByTestId, getByText, queryByText } = within(mockFullBoard);

        checkForWinCondition(playerPieces.pieces);

        expect(getByTestId("win-modal")).not.toHaveClass("show-modal");
        expect(queryByText(/Player Wins!/)).not.toBeInTheDocument();

        playerPieces.pieces = 0;

        checkForWinCondition(playerPieces.pieces);

        expect(getByTestId("win-modal")).toHaveClass("show-modal");
        expect(getByText(/Player Wins!/)).toBeInTheDocument();

    });
});