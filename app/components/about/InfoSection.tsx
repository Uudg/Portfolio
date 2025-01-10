import { motion } from "framer-motion";

const InfoSection = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2"
    >
        <div className="opacity-60 font-thin text-sm">{title}</div>
        <div className="font-ocr text-lg">{children}</div>
    </motion.div>
);

export default InfoSection;
