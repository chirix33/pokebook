import React, { useState } from "react"
import { ThemeModal } from "./ThemeModal"

export function ThemeButton() {
    // State to track the the display of the ThemeModal
    const [showModal, setShowModal] = useState(false);
    
    // Function to show/hide the ThemeModal
    // Would be passed to the ThemeModal component
    // as a callback prop to close it from "that end"
    function handleThemeModal() {
        setShowModal(!showModal ? true : false);
    }
    return (
        <div className="theme-button-wrapper">
            <div className="theme-button" onClick={handleThemeModal}>
                <span></span>
            </div>
            <ThemeModal showModal={showModal} handleThemeModal={handleThemeModal} />
        </div>
    )
}