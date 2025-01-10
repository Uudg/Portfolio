import { Outlet, NavLink, useLocation } from "@remix-run/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { motion, AnimatePresence } from "framer-motion";

export const loader: LoaderFunction = ({ request }) => {
    const url = new URL(request.url);
    if (url.pathname === "/about") {
        return redirect("/about/info");
    }
    return null;
};

const linkClass = ({ isActive }: { isActive: boolean }) => `
    p-2 w-full text-center relative opacity-60
    before:absolute before:content-[''] before:h-[2px] 
    before:bottom-0 before:left-1/2 before:right-1/2
    before:transition-all before:duration-300 before:ease-out
    hover:before:left-0 hover:before:right-0 hover:opacity-100
    ${
        isActive
            ? "before:bg-white before:left-0 before:right-0 opacity-100"
            : "before:bg-white/50"
    }
`;

const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3 },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

export default function About() {
    const location = useLocation();

    return (
        <motion.div
            className="container mx-auto p-4 flex flex-col gap-8 items-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <motion.h2
                className="text-center font-ocr text-xl"
                variants={itemVariants}
            >
                about me
            </motion.h2>

            <motion.div
                className="flex max-w-4xl p-2 w-full"
                variants={itemVariants}
            >
                <NavLink to="info" className={linkClass}>
                    info
                </NavLink>
                <NavLink to="socials" className={linkClass}>
                    socials
                </NavLink>
            </motion.div>

            <AnimatePresence mode="wait">
                {location.pathname === "/about" && (
                    <motion.div
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-xl opacity-70">Loading...</div>
                        <div className="text-sm opacity-50">
                            Redirecting to info section
                        </div>
                        <motion.div
                            className="w-6 h-6 border-t-2 border-r-2 rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                variants={itemVariants}
                className="w-full flex justify-center"
            >
                <Outlet />
            </motion.div>
        </motion.div>
    );
}
