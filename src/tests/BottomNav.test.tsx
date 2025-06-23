import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// Mock ThemeToggle (optional if ThemeToggle has heavy logic/animations)
jest.mock("../components/ThemeToggle", () => () => <div data-testid="theme-toggle" />);

describe("BottomNav", () => {
    it("renders all nav links except the current one", () => {
        render(
            <MemoryRouter>
                <BottomNav current="profile" />
            </MemoryRouter>
        );

        // Should NOT render "Profile" link
        expect(screen.queryByRole("link", { name: /profile/i })).not.toBeInTheDocument();

        // Should render others
        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /rewards/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /benefits/i })).toBeInTheDocument();
    });

    it("renders the theme toggle button", () => {
        render(
            <MemoryRouter>
                <BottomNav current="rewards" />
            </MemoryRouter>
        );

        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });
});
