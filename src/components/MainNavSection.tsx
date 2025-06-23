import Lottie from "lottie-react";
import userProfileAnim from "../assets/animations/userProfile.json";
import rewardsAnim from "../assets/animations/rewards.json";
import benefitsAnim from "../assets/animations/benefits.json";
import { motion, easeIn } from "framer-motion";
import { Link } from "react-router-dom";

// Navigation card details
const animationDataMap = [
    { label: "My Profile", animation: userProfileAnim, to: "/profile" },
    { label: "Rewards", animation: rewardsAnim, to: "/rewards" },
    { label: "Benefits", animation: benefitsAnim, to: "/benefits" },
];

const navItems = animationDataMap.map(({ label, animation, to }) => ({
    label,
    to,
    render: () => (<Lottie animationData={animation} className="w-24 h-24 md:w-[180px] md:h-[180px]" loop />),
}));

// Animation config for parent container: stagger children
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 1.5,
        },
    },
};

// Animation config for each card (simple fade-in)
const cardVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: easeIn,
        },
    },
};

const MainNavSection = () => {

    return (
        <motion.nav
            className="flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {navItems.map(({ label, render, to }) => {
                return (
                    <motion.div key={label} variants={cardVariants}>
                        <Link
                            to={to}
                            className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl 
                                bg-[#534402] dark:bg-[#0f0c0b] border dark:border-[#2a1f1a]
                                dark:shadow-[0_6px_50px_rgba(255,205,130,0.05)]
                                hover:scale-[1.10] transition-all duration-300 "
                            aria-label={label}
                        >
                            {render()}
                            <span
                                className="text-xl font-bold uppercase tracking-wide mt-4 bg-clip-text text-transparent
                                bg-white dark:bg-gradient-to-r dark:from-orange-900 dark:via-yellow-200 dark:to-orange-900"
                            >
                                {label}
                            </span>
                        </Link>
                    </motion.div>
                );
            })}
        </motion.nav>
    );
};

export default MainNavSection;
