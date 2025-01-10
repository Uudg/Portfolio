import { motion } from "framer-motion";
import InfoSection from "./InfoSection";
import ToolList from "./ToolList";
import { useAboutInfo } from "~/providers/AboutInfoProvider";

const Tools = () => {
    const { currentTools, pastTools, learningTools, familiarTools } =
        useAboutInfo();

    return (
        <motion.div className="col-span-1 flex flex-col gap-6">
            <InfoSection title="current tools">
                <ToolList tools={currentTools} />
            </InfoSection>
            <InfoSection title="past experience">
                <ToolList tools={pastTools} />
            </InfoSection>
            <InfoSection title="currently learning">
                <ToolList tools={learningTools} />
            </InfoSection>
            <InfoSection title="familiar with">
                <ToolList tools={familiarTools} />
            </InfoSection>
        </motion.div>
    );
};

export default Tools;
