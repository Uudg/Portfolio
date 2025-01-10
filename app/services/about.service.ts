import axios from "axios";
import supabase from "~/config/supabase";

export const get_info = () => {
    return supabase.from("about").select("*");
};

export const get_socials = () => {
    return supabase
        .from("socials")
        .select("*")
        .order("date", { ascending: false });
};

export const get_wpm = () => {
    return {
        data: {
            data: [
                {
                    wpm: 164.07,
                },
            ],
        },
    };
};

export const get_tools = () => {
    return supabase.from("info_tools").select("*");
};
