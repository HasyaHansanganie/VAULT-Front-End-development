import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MainNavSection from "../components/MainNavSection";

// Mock Lottie to avoid rendering animation during tests
jest.mock("lottie-react", () => () => <div data-testid="lottie-animation" />);

// Mock animation JSON imports
jest.mock("../assets/animations/userProfile.json", () => ({}));
jest.mock("../assets/animations/rewards.json", () => ({}));
jest.mock("../assets/animations/benefits.json", () => ({}));

describe("MainNavSection", () => {
    test("renders all navigation cards", () => {
        render(
            <MemoryRouter>
                <MainNavSection />
            </MemoryRouter>
        );

        // There should be 3 links with correct labels
        expect(screen.getByRole("link", { name: /my profile/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /rewards/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /benefits/i })).toBeInTheDocument();

        // There should be 3 Lottie mock elements
        expect(screen.getAllByTestId("lottie-animation")).toHaveLength(3);
    });
});
