import { MetaFunction } from "@remix-run/react";
import { motion } from "framer-motion";
import PersonalInfo from "~/components/about/PersonalInfo";
import RandomInfo from "~/components/about/RandomInfo";
import Tools from "~/components/about/Tools";
import AboutInfoProvider from "~/providers/AboutInfoProvider";

export const meta: MetaFunction = () => {
    return [{ title: "About | Info" }];
};

export default function Info() {
    return (
        <AboutInfoProvider>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
                <PersonalInfo />
                <Tools />
                <RandomInfo />
            </div>
        </AboutInfoProvider>
    );
}
