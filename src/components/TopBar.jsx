import React from "react"
import { Name } from "./Name"
import { Logo } from './Logo'
import { ThemeButton } from "./ThemeButton"
import { TopSearchBar } from "./TopSearchBar"
import { useNavigate } from "react-router-dom"

export function TopBar({onSearchChange}) {
    
    // Navigate to home page
    const navigate = useNavigate();
    function routeToHome() {
        navigate("/");
    }

    return(
        <nav>
            <div style={{display: "flex", alignItems: "center", cursor: "pointer"}} onClick={routeToHome}>
                <Logo height={80} width={122} />
                <Name className="top-heading" />
            </div>
            <TopSearchBar onSearchChange={onSearchChange} />
            <ThemeButton />
        </nav>
    )
}
