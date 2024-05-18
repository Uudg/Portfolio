import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './home.css'

const Home: React.FC = () => {
    const nameRef = useRef<HTMLHeadingElement | null>(null);
    const rolesRef = useRef(null);

    const colors = [
        ['FFB3BA', 'FFDFBA'], // Pastel Red and Pastel Orange
        ['FFFFBA', 'BAFFC9'], // Pastel Yellow and Pastel Green
        ['BAE1FF', 'BABDFF'], // Pastel Blue and Pastel Purple
        ['FFBAFF', 'FFBABA'], // Pastel Pink and Pastel Red
        ['FFBAE1', 'FFC9BA'], // Pastel Pink and Pastel Orange
        ['FFFFBA', 'C9FFBA'], // Pastel Yellow and Pastel Green
        ['BAFFD9', 'BABEFF'], // Pastel Green and Pastel Blue
        ['D9BAFF', 'FFBAD9']  // Pastel Purple and Pastel Pink
    ]


    useEffect(() => {
        const roles = rolesRef.current as HTMLElement | null;

        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const x = (window.innerWidth / 2 - clientX) / 50;
            const y = (window.innerHeight / 2 - clientY) / 50;
            const mesh = '5px';

            if (roles) {
                roles.style.textShadow = `${x}px ${y}px ${mesh} #${colors[Math.floor(Math.random() * colors.length)][0]}, ${-x}px ${-y}px ${mesh} #${colors[Math.floor(Math.random() * colors.length)][1]}`;
            }
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    const roles = ["developer", "designer", "versatile"];
    const symbols = "!@#$%^&*()|§";
    function getRandomSymbols(length: number) {
            let res = []
            for (let i = 0; i < length; i++) {
                res.push(symbols[Math.floor(Math.random() * symbols.length)]);
            }
            return res
    }

    useEffect(() => {
        // const hi = "hi, my name is"
        const name = "Danil Pankrashkin";
        let speed = 70; /* The speed/duration of the effect in milliseconds */

        let resName: string[] = []

        setTimeout(() => {
            if (nameRef.current) {
                resName = getRandomSymbols(name.length);
                nameRef.current.innerHTML = resName.join('');
                for (let i = 0; i <= name.length; i++) {
                    setTimeout(() => {
                        if (nameRef.current) { // Add this check
                            resName[i] = name[i];
                            nameRef.current.innerHTML = resName.join('');
                        }
                    }, 500 + speed * i * 1.5);
                }
            }
        })
        
    }, []);

    return(
        <>
            <div className="container home">
                <h1 className="hi fadeIn">hi, my name is</h1>
                <h1 ref={nameRef}></h1>
                <div className="roles" ref={rolesRef}>
                    {roles.map((role, index) => (
                        <div className="role" key={index}>{role}</div>
                    ))}
                </div>

                <div className="navs">
                    <button className="">
                        <Link to="/about">
                            get to know me better
                        </Link></button>
                    <button className="">
                        <Link to="/projects">
                            look at my projects (dev)
                        </Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;