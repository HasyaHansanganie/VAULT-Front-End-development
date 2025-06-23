import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
    // Initialize theme state based on saved preference
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const controls = useAnimation(); // Controls Framer Motion animation
    const [isHovering, setIsHovering] = useState(false); // Track button hover state

    // Update DOM and localStorage when theme changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    // Animate toggle thumb when hovering
    useEffect(() => {
        if (isHovering) {
            controls.start({
                x: [isDark ? 0 : 50, isDark ? 50 : 0, isDark ? 0 : 50],
                transition: {
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                },
            });
        } else {
            controls.stop();
            controls.set({ x: isDark ? 0 : 50 });
        }
    }, [isHovering, isDark, controls]);

    // Toggle theme state
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <motion.button
            onClick={toggleTheme}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            className={`
                relative w-[100px] h-[50px] rounded-full flex items-center px-4 shadow-inner
                ${isDark ? "bg-[#1a130b]" : "bg-[#f5d473]"} transition-colors duration-300
            `}
            style={{
                boxShadow: isDark
                    ? "inset 4px 4px 8px #0f0c07, inset -4px -4px 8px #392a19"
                    : "inset 6px 6px 12px #a15d00, inset -6px -6px 12px #ffd87a"
            }}
        >
            {/* Left icon (Moon) */}
            <div className="w-6 h-6 text-[#0f0c0b] dark:text-zinc-300">
                <Moon size={22} />
            </div>

            {/* Right icon (Sun) */}
            <div className="ml-auto w-6 h-6 text-yellow-900 dark:text-yellow-400">
                <Sun size={22} />
            </div>

            {/* Toggle thumb */}
            <motion.div
                animate={controls}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
                className={`
                    absolute w-[42px] h-[42px] rounded-full top-1 left-1
                    flex items-center justify-center shadow-lg z-10
                    ${isDark ? "bg-[#3c2c13]" : "bg-[#9d780a]"}
                `}
            >
                {isDark ? (
                    <Moon size={20} className="text-yellow-300" />
                ) : (
                    <Sun size={20} className="text-yellow-100" />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
