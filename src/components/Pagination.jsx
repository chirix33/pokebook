import React from "react"
import { ControllerButton } from "./ControllerButton";

function renderPageNumbers(pages, currentPage, setCurrentPage) {
    // logic for showing maximum 5 pages at a time
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pages.length, currentPage + 2);
    const displayedPages = pages.slice(startPage - 1, endPage);

    return displayedPages.map(page => (
        <li key={page}>
            <button 
            className={ currentPage === page ? 'active' : '' }
            onClick={() => setCurrentPage(page)} 
            aria-label={`Go to page ${page}`}>
            {page}
            </button>
        </li>
    ));

}
export function Pagination({pages, currentPage, setCurrentPage}) {
    return(
        <ul className='pagination-list'>
            <li>
                <ControllerButton 
                    buttonType='previous' 
                    totalPages={pages.length} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </li>
            {renderPageNumbers(pages, currentPage, setCurrentPage)}
            <li>
                <ControllerButton 
                    buttonType='forward' 
                    totalPages={pages.length} 
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </li>
        </ul> 
    )
}
