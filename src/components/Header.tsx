import React, { useEffect } from "react";
import "./header.css"
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { useLocation } from "react-router-dom";

type HeaderProps = {
  toggleContent: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<HeaderProps> = ({toggleContent}) => {
    const [menu, Toggle] = useState('')
    const [menuBtn, toggleMenuBtn] = useState('Menu')
  const location = useLocation();

    const menuToggle = () => {
        if (menu === '') {
            Toggle('active')
            toggleMenuBtn('Close')
            toggleContent('active')
        } else {
            Toggle('')
            toggleMenuBtn('Menu')
            toggleContent('')
        }
    }
    

    useEffect(() => {
        Toggle('')
        toggleMenuBtn('Menu')
        toggleContent('')
    }, [location.pathname])
  return (
    <header>
        <div className="container header">
            <div className="links list">
                <a href="https://www.linkedin.com/in/u-dg/" target="_blank">LinkedIn</a>
                <a href="https://github.com/Uudg" target="_blank">Github</a>
            </div>
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="nav list">
                <Link to="/projects">Projects</Link>
                <Link to="/about/info">About</Link>
            </div>
            <div className="mobile-btn mobile" onClick={menuToggle}>
                <div>{menuBtn}</div>
            </div>
            <div className={`mobile-menu mobile ${menu ? "active" : ""}`}>
                    <div className="mobile-nav list">
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/about/info">About</Link>
                    </div>
                    <div className="list">
                        <h2>
                    Socials
                    
                </h2>
                <div className="mobile-links list">
                    <a href="https://www.linkedin.com/in/u-dg/" target="_blank">LinkedIn</a>
                <a href="https://github.com/Uudg" target="_blank">Github</a>
                    </div>
                    </div>
                    
            </div>
        </div>
    </header>
  );
};

export default Header;
