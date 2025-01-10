import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

const AvailabilityBanner = () => {
    return (
        <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative px-6 py-2 rounded-full bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
            >
                <div className="flex items-center gap-2 relative">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                    <span className="text-sm font-light">
                        Available for work
                    </span>
                </div>
            </motion.div>

            <motion.a
                href="mailto:danilpankrat@gmail.com"
                className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1"
                whileHover={{ x: 3 }}
            >
                Contact →
            </motion.a>
        </motion.div>
    );
};

const Index = () => {
    const values = ["software engineer", "web developer", "versatile"];
    const colorClasses = [
        "bg-gradient-to-r from-blue-400 to-blue-700",
        "bg-gradient-to-r from-emerald-400 to-emerald-700",
        "bg-gradient-to-r from-purple-400 to-purple-700",
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout;

        if (isDeleting) {
            if (displayText.length === 0) {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % values.length);
                return;
            }

            timeout = setTimeout(() => {
                setDisplayText(displayText.slice(0, -1));
            }, 50);
        } else {
            const currentValue = values[currentIndex];
            if (displayText === currentValue) {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
                return;
            }

            timeout = setTimeout(() => {
                setDisplayText(currentValue.slice(0, displayText.length + 1));
            }, 100);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex]);

    return (
        <div className="container mx-auto flex flex-col gap-8 items-center justify-center flex-1 font-inter overflow-hidden">
            <motion.h1
                className="text-4xl text-center font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Hi there
            </motion.h1>
            <motion.p
                className="text-center text-2xl flex gap-1 flex-col md:flex-row"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                I am a{" "}
                <motion.span
                    className={`font-bold text-transparent bg-clip-text ${colorClasses[currentIndex]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {displayText}
                    <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-black"
                    >
                        |
                    </motion.span>
                </motion.span>
            </motion.p>
            <motion.div
                className="flex flex-col lg:flex-row justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Link to="/about">
                    <motion.div
                        className="px-6 py-3 rounded-lg backdrop-blur-sm bg-white/5 border border-gray-600/20
                                   hover:bg-white/10 transition-all duration-200 group"
                        whileHover={{ scale: 1.02, rotateZ: 0.5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-gray-300 group-hover:text-white font-light transition-colors">
                            Get to know me better
                            <span className="ml-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                →
                            </span>
                        </span>
                    </motion.div>
                </Link>

                <Link to="/projects">
                    <motion.div
                        className="px-6 py-3 rounded-lg backdrop-blur-sm bg-white/5 border border-gray-600/20
                                   hover:bg-white/10 transition-all duration-200 group"
                        whileHover={{ scale: 1.02, rotateZ: -0.5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-gray-300 group-hover:text-white font-light transition-colors">
                            Look at my projects
                            <span className="ml-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                →
                            </span>
                        </span>
                    </motion.div>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <AvailabilityBanner />
            </motion.div>
        </div>
    );
};

export default Index;
