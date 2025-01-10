import { useState } from "react";

const Footer = () => {
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <div className="container mx-auto px-4 flex flex-col mt-auto opacity-60 text-xs">
            <p className="text-center">Danil Panrkashkin</p>
            <p className="text-center">© {currentYear}</p>
        </div>
    );
};

export default Footer;
