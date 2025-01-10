import { motion } from "framer-motion";

const Blog = () => {
    return (
        <motion.div
            className="flex-1 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <motion.h1
                    className="text-4xl font-bold opacity-80"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    Blog
                </motion.h1>
                <motion.p
                    className="text-lg opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Coming Soon
                </motion.p>
            </motion.div>

            <motion.div
                className="flex gap-2"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-white opacity-50"
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Blog;
