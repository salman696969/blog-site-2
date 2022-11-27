import React from "react";
import { getByText, render, screen } from "@testing-library/react";
import Button from "./Button"

test("button atom is rendering", () => {
    render(<Button onClickHandler="" className="" children="" ariaLabel="" disabled="" bg="" text="" type=""  >Hi</Button>);
});
