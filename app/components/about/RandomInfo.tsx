import { motion } from "framer-motion";
import InfoSection from "./InfoSection";
import { useAboutInfo } from "~/providers/AboutInfoProvider";

const RandomInfo = () => {
    const { wpm } = useAboutInfo();

    const data = [
        { name: "chess.com", value: "980 ⚡" },
        { name: "monkeytype", value: `${wpm} wpm` || "Loading..." },
        { name: "fav music", value: "breakcore " },
    ];

    return (
        <motion.div className="col-span-1 lg:col-span-2">
            <InfoSection title="random">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.map((el) => (
                        <motion.div
                            key={el.name}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 bg-white/5 rounded-lg backdrop-blur-sm"
                        >
                            <div className="text-sm opacity-60">{el.name}</div>
                            <div className="text-xl font-bold font-ocr">
                                {el.value}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </InfoSection>
        </motion.div>
    );
};

export default RandomInfo;
