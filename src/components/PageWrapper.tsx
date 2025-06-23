import { motion } from "framer-motion";
import type { ReactNode } from "react";

const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 2.2 } },
    exit: { opacity: 0, transition: { duration: 1 } },
};

const PageWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
            className="min-h-screen bg-white dark:bg-luxury-dark text-white transition-colors duration-300"
        >
            {children}
        </motion.div>
    );
};

export default PageWrapper;
