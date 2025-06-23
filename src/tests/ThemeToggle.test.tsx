import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";

// Mock framer-motion completely: motion components and useAnimation hook
jest.mock("framer-motion", () => {
    const React = require("react");
    return {
        motion: {
            button: React.forwardRef(
                (
                    { children, ...props }: { children?: React.ReactNode },
                    ref: React.ForwardedRef<HTMLButtonElement>
                ) => (
                    <button ref={ref} {...props}>
                        {children}
                    </button>
                )
            ),
            div: React.forwardRef(
                (
                    { children, ...props }: { children?: React.ReactNode },
                    ref: React.ForwardedRef<HTMLDivElement>
                ) => (
                    <div ref={ref} {...props}>
                        {children}
                    </div>
                )
            ),
        },
        useAnimation: () => ({
            start: jest.fn(),
            stop: jest.fn(),
            set: jest.fn(),
        }),
    };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
    Moon: () => <svg data-testid="moon-icon" />,
    Sun: () => <svg data-testid="sun-icon" />,
}));

describe("ThemeToggle", () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove("dark");
    });

    it("renders the component", () => {
        const { getByRole } = render(<ThemeToggle />);
        expect(getByRole("button")).toBeInTheDocument();
    });

    it("sets dark mode and updates localStorage when clicked", () => {
        const { getByRole } = render(<ThemeToggle />);
        const button = getByRole("button");

        fireEvent.click(button); // Toggle dark mode on

        expect(localStorage.getItem("theme")).toBe("dark");
        expect(document.documentElement.classList.contains("dark")).toBe(true);

        fireEvent.click(button); // Toggle dark mode off

        expect(localStorage.getItem("theme")).toBe("light");
        expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("shows Moon and Sun icons", () => {
        const { getAllByTestId } = render(<ThemeToggle />);
        expect(getAllByTestId("moon-icon").length).toBeGreaterThan(0);
        expect(getAllByTestId("sun-icon").length).toBeGreaterThan(0);
    });

});
