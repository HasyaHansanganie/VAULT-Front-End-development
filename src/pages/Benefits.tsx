import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Percent, Dumbbell, UtensilsCrossed, Armchair, CalendarHeart, Ticket, ChevronLeft, ChevronRight } from "lucide-react";
import BottomNav from "../components/BottomNav";
import BenefitsBgAnim from '../assets/animations/BenefitsBgAnim.mp4';

// Benefits data
const benefits = [
    {
        id: 1,
        icon: <Percent size={40} />,
        title: "20% Off at Carrefour",
        description: "Exclusive discount for members on all groceries.",
        cta: "Claim Now",
    },
    {
        id: 2,
        icon: <Dumbbell size={40} />,
        title: "Free Gym Day Pass",
        description: "Enjoy a free full-day access to our partner gyms.",
        cta: "View Details",
    },
    {
        id: 3,
        icon: <UtensilsCrossed size={40} />,
        title: "Buy 1 Get 1 Free",
        description: "BOGO offers at selected restaurants and outlets.",
        cta: "Claim Now",
    },
    {
        id: 4,
        icon: <Armchair size={40} />,
        title: "VIP Lounge Access",
        description: "Relax in luxury lounges with your member pass.",
        cta: "Unlock",
    },
    {
        id: 5,
        icon: <CalendarHeart size={40} />,
        title: "Birthday Surprise Box",
        description: "Get a surprise gift box on your birthday month!",
        cta: "Reveal Gift",
    },
    {
        id: 6,
        icon: <Ticket size={40} />,
        title: "Exclusive Event Pass",
        description: "Access to private member-only events & webinars.",
        cta: "Get Pass",
    },
];

const Benefits = () => {
    const [loaded, setLoaded] = useState(false);   // Controls delayed display of benefit cards
    const [isDarkMode, setIsDarkMode] = useState(false);  // Tracks dark mode state for styling
    const scrollRef = useRef<HTMLDivElement>(null);  // Ref to scroll container for horizontal scroll

    // Delay loading of benefit cards for animation/effect purposes
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Function to scroll the benefit cards container left or right by one visible container width
    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    // Listen for dark mode changes on <html> element via MutationObserver
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


    return (
        <div className="relative min-h-screen bg-white dark:bg-luxury-dark overflow-hidden">

            {/* Animated Background */}
            <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden">
                <video
                    src={BenefitsBgAnim} autoPlay muted loop playsInline
                    className="object-cover w-full h-full  "
                />
            </div>

            {/* Title and subtitle */}
            <div className="relative z-10 pt-16 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-4xl md:text-5xl drop-shadow-lg font-extrabold uppercase 
                        bg-gradient-to-r from-orange-900 via-yellow-200 to-orange-900
                        bg-clip-text text-transparent tracking-widest"
                >
                    Member Benefits
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="md:mt-4 mt-10 text-sm mx-20 uppercase text-yellow-100"
                >
                    Enjoy special perks and experiences made just for our valued members
                </motion.p>
            </div>

            {/* Scrollable Benefits Cards */}
            {loaded && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="relative z-20 md:mt-[50px] mt-[100px]"
                >
                    <div className="relative px-6">

                        {/* Arrows */}
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 p-2 
                                bg-yellow-300/20 hover:bg-yellow-300/30 rounded-full shadow-md transition"
                        >
                            <ChevronLeft size={24} className="text-yellow-500" />
                        </button>

                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 p-2
                                bg-yellow-300/20 hover:bg-yellow-300/30 rounded-full shadow-md transition"
                        >
                            <ChevronRight size={24} className="text-yellow-500" />
                        </button>

                        <div ref={scrollRef}
                            className="flex overflow-x-auto scrollbar-hide gap-6 py-8 px-4 scroll-smooth"
                        >
                            {benefits.map((b) => (
                                <div
                                    key={b.id}
                                    className={`min-w-[260px] max-w-[280px] flex-shrink-0 p-5 rounded-3xl
                                        backdrop-blur-lg border border-yellow-300/30 shadow-xl
                                        transition-transform duration-500 hover:scale-110
                                        ${isDarkMode
                                            ? "bg-gradient-to-br from-yellow-500/10 to-orange-900/10"
                                            : "bg-gradient-to-br from-[#6a5603]/80 to-[#3f3301]/90"
                                        }`}
                                >
                                    <div className="mb-6 text-yellow-300">{b.icon}</div>
                                    <h3 className="text-xl font-semibold mb-1 text-yellow-200">{b.title}</h3>
                                    <p className="text-sm text-gray-100 dark:text-gray-300 mb-6">{b.description}</p>
                                    <button className="mt-auto bg-yellow-300 hover:bg-yellow-600 text-black text-sm
                                        font-semibold px-4 py-2 rounded-md transition duration-300">
                                        {b.cta}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Bottom Navigation */}
            <div className="fixed bottom-8 w-full z-50">
                <BottomNav current="benefits" />
            </div>
        </div>
    );
};

export default Benefits;
