import backArrow from '../assets/back-arrow.svg'

export function Cover({lighterGrad, darkerGrad, img, onClose}) {
    return(
        <div className="detail-cover" style={{background: `linear-gradient(rgb(${lighterGrad}), rgb(${darkerGrad}))`}}>
            <button className='close-modal' onClick={onClose}><img src={backArrow} alt="Close" height={35} width={35} /></button>
            <img src={img} alt='Pokemon Image' width={200} height={200} />
        </div>
    )
}