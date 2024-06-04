import React, { useState } from 'react';
import { useTheme } from './ThemeProvider';

export const ThemeToggle = () => {

    const { toggleTheme } = useTheme();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        toggleTheme();
    }

    return (
        <div className="toggleTheme" onClick={handleToggle}>
            <span>change theme</span>
            <i className={`fas ${isToggled ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
        </div>
    );
}