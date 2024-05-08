import React from "react"
import search from '../assets/search-dark.svg'

export function TopSearchBar({ onSearchChange }) {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Enter a pokemon name" onChange={(e) => onSearchChange(e.target.value)} />
            <span><img src={search} alt="Search" width={20}  /></span>
        </div>
    )
}