import { useEffect, useState } from "react";
import { get_socials } from "~/services/about.service";

const useSocials = () => {
    const [socials, setSocials] = useState<any>(null);

    const load = async () => {
        try {
            const { data, error } = await get_socials();
            if (error) {
                throw error;
            }
            setSocials(data);
        } catch (error) {
            console.error("Error fetching socials:", error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return { socials };
};

export default useSocials;
