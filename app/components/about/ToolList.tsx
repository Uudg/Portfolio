import { motion } from "framer-motion";

const containerVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const ToolList = ({ tools }: { tools: { name: string; icon: string }[] }) => {
    if (!tools) {
        return (
            <motion.div
                className="px-3 py-1 bg-white/5 rounded-full text-sm backdrop-blur-sm inline-flex items-center gap-2"
                animate={{
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <span>Loading</span>
                <motion.span
                    animate={{
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    ...
                </motion.span>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="flex flex-wrap gap-2"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            {tools.map((tool) => (
                <motion.span
                    key={tool.name}
                    variants={itemVariants}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255,255,255,0.1)",
                        transition: { duration: 0.2 },
                    }}
                    className="px-3 py-1 bg-white/5 rounded-full text-sm backdrop-blur-sm"
                >
                    {tool.icon} {tool.name}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default ToolList;
