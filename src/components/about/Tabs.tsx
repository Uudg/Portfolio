import React, { useState, useEffect } from 'react';

interface TabsProps {
    tab: string;
    onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tab, onTabChange }) => {
    const [renderedText, setRenderedText] = useState(['', '', '']);
    const tabs = ['info', 'social'];

    const handleClick = (tabName: string) => {
        onTabChange(tabName);
    };

    useEffect(() => {
        tabs.forEach((tabName, index) => {
            let text = '';
            let i = 0;
            const interval = setInterval(() => {
                if (i < tabName.length) {
                    text += tabName[i];
                    setRenderedText(prev => {
                        const newRenderedText = [...prev];
                        newRenderedText[index] = text;
                        return newRenderedText;
                    });
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
        });
    }, []);

    return (
        <div className="tabs">
            {tabs.map((tabName, index) => (
                <div
                    key={tabName}
                    className={`tab ${tab === tabName ? 'active' : ''}`}
                    onClick={() => handleClick(tabName)}
                >
                    {renderedText[index]}
                </div>
            ))}
        </div>
    );
};

export default Tabs;