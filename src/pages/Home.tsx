import { useEffect, useState } from "react";
import VaultLogo from "../assets/Logo.png";
import MainNavSection from "../components/MainNavSection";
import ThemeToggleButton from "../components/ThemeToggle";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import BgAnimDark from '../assets/animations/HomeAnimDark.mp4';
import BgAnimLight from '../assets/animations/HomeAnimLight.mp4';

// VAULT letters for intro animation
const letters = ["V", "A", "U", "L", "T"];

const Home = () => {
    const [showIntro, setShowIntro] = useState(true);

    // Hide intro after 2 seconds
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowIntro(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    // Intro Animation variants for each letter
    const letterVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.4,
                duration: 0.6,
                ease: easeOut,
            },
        }),
    };

    return (
        <div className="relative min-h-screen flex flex-col">

            {/* VAULT Intro Animation */}
            <AnimatePresence>
                {showIntro && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -50, transition: { duration: 1 } }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center z-50 bg-black"
                    >
                        <div className="flex space-x-4 md:space-x-6">
                            {letters.map((letter, index) => (
                                <motion.span
                                    key={index}
                                    custom={index}
                                    variants={letterVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className={`
                                        text-[48px] md:text-[80px] font-extrabold uppercase tracking-widest
                                        bg-gradient-to-r from-orange-900 via-yellow-200 to-orange-900 
                                        bg-clip-text text-transparent
                                    `}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="relative w-screen h-screen overflow-hidden">

                {/* Background Video for dark mode */}
                <video
                    src={BgAnimDark} autoPlay muted loop playsInline
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 object-cover
                    w-full h-full hidden dark:block md:w-[150vh] md:h-auto md:rotate-90"
                />

                {/* Background Video for light mode */}
                <video
                    src={BgAnimLight} autoPlay muted loop playsInline
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 object-cover
                    w-full h-full dark:hidden opacity-60 md:w-[150vh] md:h-auto md:rotate-90"
                />

                {/* Gradient Overlay to soften the video background */}
                <div className="absolute inset-0 z-10 bg-white dark:bg-luxury-dark opacity-60 dark:opacity-80"></div>

                {/* Content */}
                {!showIntro && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 flex flex-col items-center justify-between py-10 h-screen gap-8"
                    >
                        {/* Top Logo */}
                        <img
                            src={VaultLogo}
                            alt="VAULT Logo"
                            className="w-[250px] md:w-64 h-auto mt-4"
                        />

                        {/* Middle Nav Bar */}
                        <MainNavSection />

                        {/* Bottom Theme Toggle */}
                        <ThemeToggleButton />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
