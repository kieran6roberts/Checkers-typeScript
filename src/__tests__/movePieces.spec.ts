import { within } from "@testing-library/dom";

import appendScoreToDOM from "../ts/appendScoreToDOM";
import initPlayerPieces from "../ts/initPlayerPieces";
import setCurrentPieceHandler from "../ts/setCurrentPieceHandler";
import { gameControl } from "../ts/control";
import { mockFullBoard } from "../../setupTests";
import userEvent from "@testing-library/user-event";

describe("players are able to move pieces, turns change and jump is possible", () => {
    document.body.appendChild(mockFullBoard);

    test("setValidMoves sets correct move squares", () => {
        const { getAllByRole, getByTestId, getByText } = within(mockFullBoard);

        initPlayerPieces(gameControl.currentPlayer, setCurrentPieceHandler);
        appendScoreToDOM();

        expect(getByTestId("28")).not.toHaveClass("valid-drop");
        expect(getByTestId("30")).not.toHaveClass("valid-drop");

        // red piece 11 is able to move first turn to squares 28 & 30
        userEvent.click(getAllByRole("button")[11]);

        expect(getByTestId("28")).toHaveClass("valid-drop");
        expect(getByTestId("30")).toHaveClass("valid-drop");
        
        const redBtn9 = getAllByRole("button")[9];
        // red piece 9 is able to move first turn to squares 24 & 26
        userEvent.click(redBtn9);

        expect(getByTestId("17")).toContainElement(redBtn9);
        expect(getByTestId("28")).not.toHaveClass("valid-drop");
        expect(getByTestId("30")).not.toHaveClass("valid-drop");

        expect(getByTestId("24")).toHaveClass("valid-drop");
        expect(getByTestId("26")).toHaveClass("valid-drop");

        userEvent.click(getByTestId("26"));

        expect(getByTestId("26")).toContainElement(redBtn9);
        expect(getByTestId("17")).not.toContainElement(redBtn9);

        const blueBtn1 = getAllByRole("button")[13];
        // blue piece 1 should now be able to move to square 33
        userEvent.click(blueBtn1);

        expect(getByTestId("33")).toHaveClass("valid-drop");
        expect(getByTestId("40")).toContainElement(blueBtn1);

        userEvent.click(getByTestId("33"));

        expect(getByTestId("33")).toContainElement(blueBtn1);
        expect(getByTestId("33")).not.toHaveClass("valid-drop");
        expect(getByTestId("40")).not.toContainElement(blueBtn1);

        expect(getByTestId("40")).not.toHaveClass("valid-drop");
        
        // red piece 9 should now be able to jump blue piece 1
        userEvent.click(redBtn9);
        
        expect(getByTestId("40")).toHaveClass("valid-drop");

        userEvent.click(getByTestId("40"));

        expect(blueBtn1).not.toBeInTheDocument();
        expect(getByTestId("40")).toContainElement(redBtn9);

        // score is updated
        expect(getByText("11")).toBeInTheDocument();
    });
});