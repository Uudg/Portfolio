import {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
import { get_tools, get_wpm } from "~/services/about.service";

const AboutInfoContext = createContext<any>(null);

interface Tool {
    id: number;
    name: string;
    type: string;
}

const AboutInfoProvider = ({ children }: { children: ReactNode }) => {
    const [wpm, setWpm] = useState<number | null>(null);
    const [tools, setTools] = useState<Tool[] | null>(null);

    const [currentTools, setCurrentTools] = useState<Tool[] | null>(null);
    const [pastTools, setPastTools] = useState<Tool[] | null>(null);
    const [learningTools, setLearningTools] = useState<Tool[] | null>(null);
    const [familiarTools, setFamiliarTools] = useState<Tool[] | null>(null);

    const loadWpm = async () => {
        try {
            const {
                data: { data },
            } = await get_wpm();
            if (data && data.length > 0) {
                setWpm(data[0].wpm);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const loadTools = async () => {
        try {
            const { data } = await get_tools();

            if (data) {
                setTools(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (tools) {
            const current = tools.filter(
                (tool: Tool) => tool.type === "current"
            );
            const past = tools.filter((tool: Tool) => tool.type === "past");
            const learning = tools.filter(
                (tool: Tool) => tool.type === "learning"
            );
            const familiar = tools.filter(
                (tool: Tool) => tool.type === "familiar"
            );

            setCurrentTools(current);
            setPastTools(past);
            setLearningTools(learning);
            setFamiliarTools(familiar);
        }
    }, [tools]);

    useEffect(() => {
        loadWpm();
        loadTools();
    }, []);

    const value = {
        wpm,
        tools,
        currentTools,
        pastTools,
        learningTools,
        familiarTools,
    };

    return (
        <AboutInfoContext.Provider value={value}>
            {children}
        </AboutInfoContext.Provider>
    );
};

export const useAboutInfo = () => {
    return useContext(AboutInfoContext);
};

export default AboutInfoProvider;
