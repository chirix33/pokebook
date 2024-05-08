import React, { useRef, useEffect } from "react"
import { useTheme } from '../context/ThemeContext'
import close from '../assets/close.svg'

export function ThemeModal({showModal, handleThemeModal}) {
    // Grab and destruct the useTheme() function from ThemeContext
    // theme has the current theme used and toggleTheme toggles the current theme
    const { theme, toggleTheme } = useTheme();

    // Close/Show the ThemeModal Components based on the showModal prop
    // affect the class passed unto the div
    let classes = showModal ? "theme-modal" : "theme-modal hidden";


    // Function to toggle the theme and close the ThemeModal Component
    // The Callback prop method from ThemeButton is used here
    function handleThemeChange() {
        toggleTheme();
        handleThemeModal();
    }

    return (
        <div className={classes}>
            <div className="theme-modal-content">
                <span className="theme-close-button" onClick={handleThemeModal}>
                    <img src={close} alt="Close" height={50} width={50} />
                </span>
                <div className="theme-modal-header">
                    <h2>Choose Theme</h2>
                </div>
                <div className="theme-modal-body">
                    <div 
                    className={theme === "pink" ? "theme-button selected pink-theme-background" : "theme-button pink-theme-background"} 
                    data-theme="pink"
                    onClick={theme === "pink" ? ()=>{} : handleThemeChange}
                    >
                        <span></span>
                    </div>
                    <div 
                    className={theme === "blue" ? "theme-button selected blue-theme-background" : "theme-button blue-theme-background"} 
                    datatheme="blue"
                    onClick={theme === "blue" ? ()=>{} : handleThemeChange}
                    >
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )
} 