import backArrow from '../assets/back-arrow.svg'
import frontArrow from '../assets/front-arrow.svg'

// Component to render the controller button
// the icon to show, the arial-label, and logic to check if button should work
// are all here
export function ControllerButton({buttonType, totalPages, currentPage, setCurrentPage}) {
    // allow the button default to true, if 'future' action is not allowed
    // then set it to false.
    let allowButtonToWork = true; 
    let action;
    let ariaLabel;
    let arrowToShow;

    if (buttonType === 'previous') {
        action = currentPage - 1;
        ariaLabel = 'Go to previous page'
        arrowToShow = backArrow
        if (action < 1) allowButtonToWork = false;
    } else if (buttonType === 'forward') {
        action = currentPage + 1;
        ariaLabel = 'Go to next page'
        arrowToShow = frontArrow
        if (action > totalPages) allowButtonToWork = false;
    }

    return (
        <button 
        onClick={() => allowButtonToWork && setCurrentPage(action)}
        aria-label={ariaLabel}
        >
            <img src={arrowToShow} alt="Previous" height={25} width={25} />
        </button>
    )
}