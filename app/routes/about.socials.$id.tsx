import { useParams } from "@remix-run/react";
import { useEffect } from "react";

const SocialView = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <div>
            <h2 className="font-bold text-4xl">Social Event: {id}</h2>
        </div>
    );
};

export default SocialView;
