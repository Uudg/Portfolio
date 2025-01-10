import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Tooltip = ({ text }: { text: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs 
                   backdrop-blur-sm bg-black/80 text-white rounded whitespace-nowrap"
    >
        {text}
    </motion.div>
);

const TypeBadge = ({ type, awarded }: { type: string; awarded: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <motion.p
                whileHover={{ scale: 1.1 }}
                className={`
                    text-sm px-3 py-1 rounded-full
                    ${
                        type === "hackaton"
                            ? "bg-green-600/10 text-green-500"
                            : type === "conference"
                            ? "bg-blue-600/10 text-blue-500"
                            : "bg-gray-600/10 text-gray-500"
                    }
                `}
            >
                {type} {awarded && "🏆"}
            </motion.p>
            <AnimatePresence>
                {isHovered && awarded && <Tooltip text="Awarded! 🎉" />}
            </AnimatePresence>
        </motion.div>
    );
};

const Event = ({ data }: any) => {
    const formattedDate = format(new Date(data.date), "MMMM yyyy");

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
            whileInView={{
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                },
            }}
            whileHover={{
                scale: 1.02,
                rotateZ: 1,
                transition: { duration: 0.2 },
            }}
            viewport={{ once: true, margin: "50px" }}
            className="col-span-1 py-4 flex flex-col gap-4 border-b border-gray-600 h-full justify-between self-end backdrop-blur-sm bg-opacity-5 bg-white p-6 rounded-lg"
        >
            <motion.h3
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-extralight text-2xl font-ocr"
            >
                {data.name}
            </motion.h3>
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between gap-2 items-end"
            >
                <div className="flex flex-col">
                    <p className="font-light text-sm opacity-70">
                        {formattedDate}
                    </p>
                    <p className="font-ocr">{data.location}</p>
                </div>
                <TypeBadge type={data.type} awarded={data.awarded} />
            </motion.div>
        </motion.div>
    );
};

export default Event;
