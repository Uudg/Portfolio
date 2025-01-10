import { NavLink } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const linkClass = "opacity-70 hover:opacity-100 duration-300 px-4 py-2";

const nameVariants = {
    initial: { maxWidth: "0", opacity: 0 },
    closed: { maxWidth: "0", opacity: 0.7 },
    open: { maxWidth: "200px", opacity: 1 },
};

const menuVariants = {
    closed: {
        x: "100%",
        transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
        x: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
    },
};

const sideLinksVariants = {
    initial: { x: -20, opacity: 0 },
    animate: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

const navLinksVariants = {
    initial: { x: 20, opacity: 0 },
    animate: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

const menuBackdropVariants = {
    closed: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
    open: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

const mobileMenuItemVariants = {
    closed: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 },
    },
    open: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

const socialLinksVariants = {
    closed: {
        opacity: 0,
        scale: 0.8,
    },
    open: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.3 + i * 0.1,
            duration: 0.4,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

const Header = () => {
    const [showInitialAnimation, setShowInitialAnimation] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitialAnimation(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header className="container mx-auto flex justify-between font-ocr items-center px-8 lg:px-0 relative py-4 lg:py-0">
            <div className="gap-10 hidden lg:flex">
                {["linkedIn", "github"].map((item, i) => (
                    <motion.a
                        key={item}
                        href={
                            item === "linkedIn"
                                ? "https://www.linkedin.com/in/u-dg/"
                                : "https://github.com/Uudg"
                        }
                        target="__blank"
                        className={linkClass}
                        variants={sideLinksVariants}
                        initial="initial"
                        animate="animate"
                        custom={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item}
                    </motion.a>
                ))}
            </div>
            <NavLink to="/" className="absolute left-1/2 -translate-x-1/2">
                <motion.div
                    className="flex text-xl items-center opacity-70 hover:opacity-100 duration-300 gap-2"
                    whileHover={!showInitialAnimation ? "open" : undefined}
                    initial="initial"
                    animate={showInitialAnimation ? "open" : "closed"}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="flex items-end">
                        <span>D</span>
                        <motion.span
                            variants={nameVariants}
                            className="text-sm overflow-hidden"
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            anil
                        </motion.span>
                    </div>
                    <div className="flex items-end">
                        <span>P</span>
                        <motion.span
                            variants={nameVariants}
                            className="text-sm overflow-hidden"
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                        >
                            ankrashkin
                        </motion.span>
                    </div>
                </motion.div>
            </NavLink>
            <div className="lg:flex gap-10 hidden">
                {["about", "projects", "blog"].map((item, i) => (
                    <motion.div
                        key={item}
                        variants={navLinksVariants}
                        initial="initial"
                        animate="animate"
                        custom={i}
                    >
                        <NavLink to={`/${item}`} className={linkClass}>
                            {item}
                        </NavLink>
                    </motion.div>
                ))}
            </div>
            <div className="lg:hidden flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isMobileMenuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        ></path>
                    </svg>
                </button>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-dark/80 backdrop-blur-md z-40"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuBackdropVariants}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed inset-x-4 top-20 bottom-4 bg-dark/90 rounded-2xl z-50 flex flex-col items-center justify-center"
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                        >
                            <div className="flex flex-col items-center gap-8">
                                {["about", "projects", "blog"].map(
                                    (item, i) => (
                                        <motion.div
                                            key={item}
                                            custom={i}
                                            variants={mobileMenuItemVariants}
                                        >
                                            <NavLink
                                                to={`/${item}`}
                                                className="text-2xl font-medium tracking-wide opacity-70 hover:opacity-100 duration-300"
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {item}
                                            </NavLink>
                                        </motion.div>
                                    )
                                )}

                                <div className="flex gap-6 mt-8">
                                    {["linkedIn", "github"].map((item, i) => (
                                        <motion.a
                                            key={item}
                                            custom={i}
                                            variants={socialLinksVariants}
                                            href={
                                                item === "linkedIn"
                                                    ? "https://www.linkedin.com/in/u-dg/"
                                                    : "https://github.com/Uudg"
                                            }
                                            target="_blank"
                                            className="opacity-70 hover:opacity-100 duration-300"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {item}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
