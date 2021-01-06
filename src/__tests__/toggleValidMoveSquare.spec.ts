import { within } from "@testing-library/dom";

import toggleValidMoveSquare from "../ts/toggleValidMoveSquare";
import { CLASS } from "../ts/control";
import { mockFullBoard } from "../../setupTests";


describe("valid drop class is toggled on given square", () => {
    document.body.appendChild(mockFullBoard);

    test("error is thrown when element is falsy", () => {
        const { queryByTestId, getByTestId } = within(mockFullBoard);

        expect(() => toggleValidMoveSquare(queryByTestId("388") as HTMLElement, CLASS.ADD)).toThrowError(new Error("element does not exist!"));
        expect(() => toggleValidMoveSquare(queryByTestId(47) as HTMLElement, CLASS.ADD)).toThrowError(new Error("element does not exist!"));
        expect(() => toggleValidMoveSquare(getByTestId("30") as HTMLElement, CLASS.ADD)).not.toThrowError(new Error("element does not exist!"));
    });
    
    test("correct class is toggled", () => {
        const { getByTestId } = within(mockFullBoard);

        toggleValidMoveSquare(getByTestId("30") as HTMLElement, CLASS.ADD);
        
        expect(getByTestId("30")).toHaveClass("valid-drop");
        
        toggleValidMoveSquare(getByTestId("30") as HTMLElement, CLASS.REMOVE);
        
        expect(getByTestId("30")).not.toHaveClass("valid-drop");
    });
});