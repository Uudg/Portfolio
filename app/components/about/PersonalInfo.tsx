import { motion } from "framer-motion";
import InfoSection from "./InfoSection";

const PersonalInfo = () => {
    const calculateAge = () => {
        const today = new Date();
        const birthDate = new Date("2002-11-14");
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }
        return age;
    };
    return (
        <motion.div className="col-span-1 flex flex-col gap-6">
            <InfoSection title="full name">Danil Pankrashkin</InfoSection>
            <InfoSection title="age">{calculateAge()}</InfoSection>
            <InfoSection title="current location">Riga, LV</InfoSection>
            <InfoSection title="education">
                Riga Technical University - CS - 2/3
            </InfoSection>
        </motion.div>
    );
};

export default PersonalInfo;
