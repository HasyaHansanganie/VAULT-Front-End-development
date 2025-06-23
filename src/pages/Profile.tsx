import { motion } from "framer-motion";
import BottomNav from "../components/BottomNav";
import Avatar from '../assets/avatar.jpg';

// Animation variants for the info section container
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 2,      // delay to sync with name animation
            staggerChildren: 0.6,  // delay between level and progress bar
        }
    }
};

// Animation for each item (level, progress bar)
const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const Profile = () => {
    return (
        <div className="min-h-screen flex flex-col items-center py-10 bg-white dark:bg-luxury-dark transition-all duration-300 overflow-hidden">

            {/* Top Title */}
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold uppercase text-center bg-gradient-to-r from-orange-900 via-yellow-200 to-orange-900 tracking-widest bg-clip-text text-transparent">
                My Profile
            </h1>

            {/* Profile Card Section */}
            <div
                className="mt-20 flex flex-col md:flex-row items-center gap-16 p-10 rounded-2xl 
                bg-[#534402] dark:bg-[#0f0c0b] shadow-[0_20px_150px_rgba(255,205,130,0.15)] 
                hover:scale-[1.10] transition-all duration-300 border dark:border-[#2a1f1a]"
            >
                {/* Avatar */}
                <div className="p-2 aspect-square rounded-2xl w-[200px] h-[200px] flex items-center justify-center bg-[#382d01] dark:bg-white/10">
                    <img
                        src={Avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Info Section with staggered animations */}
                <motion.div
                    className="flex flex-col items-center md:items-start gap-5 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* User Name with delay */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="text-lg sm:text-2xl font-bold uppercase dark:text-yellow-200"
                    >
                        Hasya Hansanganie
                    </motion.h2>

                    {/* Level Text */}
                    <motion.p variants={itemVariants} className="text-md dark:text-gray-300 uppercase">
                        Level 5 - Elite Member
                    </motion.p>

                    {/* Progress Bar */}
                    <motion.div
                        variants={itemVariants}
                        className="relative w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ delay: 2.2, duration: 2 }}
                            className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-500 rounded-full shadow-md"
                        />

                        {/* XP Text inside the progress bar */}
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black">
                            700 / 1000 XP
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 z-50 left-1/2 transform -translate-x-1/2 w-full mt-10 md:static md:left-auto md:transform-none md:w-auto">
                <BottomNav current="profile" />
            </div>
        </div>
    );
};

export default Profile;
