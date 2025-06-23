import { Link } from "react-router-dom";
import { Home, User, Gem, Gift } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import VaultLogo from "../assets/Logo.png";

interface BottomNavProps {
    current: "profile" | "rewards" | "benefits";
}

const BottomNav = ({ current }: BottomNavProps) => {
    const items = [
        { key: "home", to: "/", icon: <Home size={24} /> },
        { key: "profile", to: "/profile", icon: <User size={24} /> },
        { key: "rewards", to: "/rewards", icon: <Gem size={24} /> },
        { key: "benefits", to: "/benefits", icon: <Gift size={24} /> },
    ];

    return (
        <nav className="py-6 flex flex-row items-center justify-center gap-6 px-4">

            {/* Logo - only visible on md and larger screens */}
            <div className="hidden md:block">
                <img
                    src={VaultLogo}
                    alt="Vault Logo"
                    className="w-32 md:w-[170px] h-auto object-contain"
                />
            </div>

            {/* Icons + ThemeToggle */}
            <div className="flex flex-row items-center justify-center w-full md:w-auto">
                <div className="flex flex-row gap-5">
                    {items
                        .filter(item => item.key !== current)
                        .map(({ key, to, icon }) => (
                            <Link
                                key={key}
                                to={to}
                                aria-label={key}
                                className="flex items-center text-xs text-yellow-200"
                            >
                                <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full 
                                        bg-[#a15d00] dark:bg-[#1a130b] dark:hover:bg-[#a15d00] hover:bg-[#1a130b]
                                        dark:shadow-[0_2px_6px_rgba(255,205,100,0.2),0_1px_2px_rgba(255,255,255,0.05)] 
                                        hover:shadow-[0_3px_10px_rgba(255,205,100,0.35),0_2px_4px_rgba(255,255,255,0.07)] 
                                        transition-all duration-300 ease-in-out hover:scale-105">
                                    {icon}
                                </div>
                            </Link>
                        ))}
                </div>

                {/* Theme Toggle Button*/}
                <div className="ml-5 md:ml-4">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;
