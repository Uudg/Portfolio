import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Background from "./components/Background";
import { Outlet } from "react-router-dom";
import "./App.css";
import "./components/bg.css"

const App: React.FC = () => {
    const [toggle, setToggle] = useState<string>('')
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 5000); // 2000 milliseconds = 2 seconds

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
        <>
            <div>
                {<Background isLoaded={isLoaded}/>}
            </div>
            
                <div>
                        <div className="view">
                                <Header toggleContent={setToggle}/>
                                <div className={`route ${toggle ? "active" : ""}`}>
                                    <Outlet/>
                                </div>
                                <Footer/>
                        </div>
                </div>
        </>
    );
};

export default App;