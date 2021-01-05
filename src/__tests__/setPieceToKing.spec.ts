import { within } from "@testing-library/dom";

import setPieceToKing from "../ts/setPieceToKing";
import { mockFullBoard } from "../../setupTests";

describe("toggles king on a piece", () => {
    document.body.appendChild(mockFullBoard);

    test("set piece to king", () => {
        const { getAllByRole, getByText, queryByText } = within(mockFullBoard);

        expect(getAllByRole("button")[1]).not.toHaveClass("king");
        expect(getAllByRole("button")[1]).not.toContainElement(queryByText("K"));

        setPieceToKing("a2");
        
        expect(getAllByRole("button")[1]).toHaveClass("king");
        expect(getAllByRole("button")[1]).toContainElement(getByText("K"));
    });
    test("don't create second div child if piece is already king", () => {
        const { getAllByRole, getByText } = within(mockFullBoard);

        setPieceToKing("a2");

        setPieceToKing("a2");

        expect(getAllByRole("button")[1]).toContainElement(getByText("K"));
    });
});