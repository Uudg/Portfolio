import "./about.css";
import {useState } from "react";
import Info from "../components/about/Info";
import Work from "../components/about/Work";
import Social from "../components/about/Social";
import Tabs from "../components/about/Tabs";
import { useNavigate, useParams } from "react-router-dom";

const About: React.FC = () => {
    const navigate = useNavigate();
    const ctab = useParams()['tab'];

    const [tab, setTab] = useState<string>(ctab || "info"); // Set initial tab state to ctab if it's defined, or "info" if it's not

    const handleTabChange = (tabName: string) => {
        setTab(tabName);
        navigate(`/about/${tabName}`);
    }

    return (
        <div>
           <h1 className="title">
            about me
           </h1>
           <div className="container about-container">
                <Tabs tab={tab} onTabChange={handleTabChange}/>
                {tab === 'info' && <Info />}
                {tab === 'work' && <Work />}
                {tab === 'social' && <Social />}
           </div>
        </div>
    )
}

export default About;