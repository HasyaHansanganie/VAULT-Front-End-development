import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, } from "recharts";
import { CheckCircle, Lock } from "lucide-react";
import BottomNav from "../components/BottomNav";
import RewardBgAnim from "../assets/animations/RewardBgAnim.mp4";

// Reward list data
const rewards = [
    { id: 1, title: "$100 Amazon Voucher", xpRequired: 500, claimed: true },
    { id: 2, title: "Spotify Premium (1 Month)", xpRequired: 1000, claimed: false },
    { id: 3, title: "Netflix Gift Card", xpRequired: 1500, claimed: false },
    { id: 4, title: "1-Year Disney+ Subscription", xpRequired: 3000, claimed: false },
];

// XP Progress values
const currentXP = 700;
const maxXP = 1000;
const progressPercent = Math.min((currentXP / maxXP) * 100, 100);

// Data for the radial progress chart
const chartData = [
    {
        name: "XP",
        value: progressPercent,
        fill: "url(#xpGradient)",
    },
];

// Identify the next locked reward
const nextReward = rewards.find((r) => !r.claimed && currentXP < r.xpRequired);

const Rewards = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rewardData, setRewardData] = useState<typeof rewards>([]);

    // Detect dark mode toggle in real-time
    useEffect(() => {
        const darkModeOn = document.documentElement.classList.contains("dark");
        setIsDarkMode(darkModeOn);

        const observer = new MutationObserver(() => {
            setIsDarkMode(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    // Simulate data loading delay
    useEffect(() => {
        setTimeout(() => {
            setRewardData(rewards);
            setLoading(false);
        }, 4000);
    }, []);

    return (
        <div className="relative w-screen min-h-screen md:h-screen overflow-x-hidden overflow-y-auto">

            {/* Background Video */}
            <video
                src={RewardBgAnim} autoPlay muted loop playsInline
                className="
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    z-0 object-cover w-screen h-full opacity-10 dark:opacity-5"
            />

            {/* Foreground Content */}
            <div className="relative z-10 min-h-screen pt-10 md:pb-0 pb-32 text-center text-gray-800 dark:text-gray-200 overflow-x-hidden">
                <div className="mt-3 flex flex-col md:flex-row justify-center items-start gap-y-10 md:gap-x-10 max-w-screen-lg mx-auto">

                    {/* XP Progress */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <h1 className="text-4xl font-extrabold uppercase text-center tracking-widest bg-gradient-to-r from-orange-900 via-yellow-300 to-orange-900 bg-clip-text text-transparent">
                            Your XP Progress
                        </h1>

                        {/* Radial XP Progress Chart */}
                        <div className="w-64 h-64 mx-auto relative mt-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="70%"
                                    outerRadius="100%"
                                    barSize={40}
                                    data={chartData}
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <defs>
                                        <linearGradient id="xpGradient" x1="0" y1="0" x2="1" y2="1">
                                            <stop offset="0%" stopColor="#facc15" />
                                            <stop offset="100%" stopColor={isDarkMode ? "#ea580c" : "#0f0c0b"} />
                                        </linearGradient>
                                    </defs>
                                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                                    <RadialBar
                                        background={{ fill: isDarkMode ? "#2d2d2d" : "#2f1d02", }}
                                        dataKey="value"
                                        cornerRadius={10}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>

                            {/* XP Value Inside Chart */}
                            <div className="absolute inset-0 flex flex-col font-bold items-center justify-center pointer-events-none">
                                <span className="text-yellow-400 text-3xl">{currentXP}</span>
                                <span className="text-yellow-500 text-sm">/ {maxXP} XP</span>
                            </div>
                        </div>

                        {/* XP Summary */}
                        <p className="mt-4 text-lg font-semibold text-[#2f2900] dark:text-white">
                            {currentXP} / {maxXP} XP <br /> to unlock your next reward
                        </p>
                    </motion.div>

                    {/* Rewards Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="w-full md:w-1/2 flex flex-wrap justify-center gap-6"
                    >
                        <h2 className="w-full text-lg font-semibold uppercase tracking-widest text-yellow-800 dark:text-white mb-2 text-center">
                            Claim Your Rewards
                        </h2>

                        {loading ? (
                            // Skeleton Loading Cards
                            Array.from({ length: 4 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="relative p-5 pb-16 w-[220px] rounded-2xl border border-yellow-300/30 bg-[#534402] dark:bg-[#0f0c0b] shadow-md animate-pulse"
                                >
                                    <div className="h-5 w-3/4 bg-yellow-800/30 dark:bg-gray-700 rounded mb-4"></div>
                                    <div className="h-3 w-1/2 bg-yellow-800/20 dark:bg-gray-600 rounded mb-6"></div>
                                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[75%] h-8 rounded bg-yellow-900/30 dark:bg-gray-700"></div>
                                </div>
                            ))
                        ) : (
                            // Render Actual Rewards
                            rewardData.map((reward) => {
                                const unlocked = currentXP >= reward.xpRequired;
                                const isNext = reward.id === nextReward?.id && !reward.claimed && !unlocked;

                                return (
                                    <div
                                        key={reward.id}
                                        className={`relative p-5 pb-16 w-[220px] rounded-2xl border 
                                            bg-[#534402] dark:bg-[#0f0c0b] shadow-md 
                                            ${unlocked ? "hover:scale-105" : ""} transition-transform duration-300
                                            ${isNext ? "animate-pulse-glow-light dark:animate-pulse-glow-dark ring-2 ring-yellow-300 scale-[1.05]"
                                                : "border-yellow-300 dark:border-yellow-800"}
                                        `}
                                    >
                                        <h3 className="text-lg font-semibold mb-2 dark:text-yellow-200 text-yellow-100">
                                            {reward.title}
                                        </h3>
                                        <p className="text-sm mb-4 text-white dark:text-gray-400">
                                            Unlocks at {reward.xpRequired} XP
                                        </p>

                                        {/* Claim/Locked/Claimed Buttons */}
                                        <button
                                            disabled={!unlocked || reward.claimed}
                                            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 
                                                w-[75%] py-2 px-4 rounded-md text-sm font-medium transition duration-300
                                                ${reward.claimed
                                                    ? "bg-green-600 text-white cursor-default"
                                                    : unlocked
                                                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                                                        : "bg-[#382d01] dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                                                }`}
                                        >
                                            {reward.claimed ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <CheckCircle size={16} /> Claimed
                                                </span>
                                            ) : unlocked ? (
                                                "Claim Now"
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Lock size={16} /> Locked
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                );
                            }
                            ))}
                    </motion.div>
                </div>

                {/* Bottom Navigation */}
                <>
                    {/* Mobile version */}
                    <div className="w-full fixed bottom-0 z-50 left-1/2 transform -translate-x-1/2
                        md:hidden bg-white dark:bg-luxury-dark">
                        <BottomNav current="rewards" />
                    </div>

                    {/* Medium and larger screens */}
                    <div className="hidden md:block mt-5">
                        <BottomNav current="rewards" />
                    </div>
                </>
            </div>
        </div>
    );
};

export default Rewards;
