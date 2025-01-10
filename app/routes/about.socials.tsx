import { motion, AnimatePresence } from "framer-motion";
import useSocials from "~/hooks/useSocials";
import Event from "~/components/about/Event";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [{ title: "About | Socials" }];
};

export default function Social() {
    const { socials } = useSocials();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full perspective-1000"
        >
            {socials &&
                socials.map((el: any, i: number) => (
                    <motion.div
                        key={el.id}
                        style={{
                            transformStyle: "preserve-3d",
                            translateZ: `${i * 5}px`,
                        }}
                    >
                        <Event data={el} />
                    </motion.div>
                ))}
        </motion.div>
    );
}
