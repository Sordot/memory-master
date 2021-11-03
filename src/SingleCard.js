import './SingleCard.css'

const SingleCard = ({card, handleChoice, flipped}) => {

    const handleClick = () => {
        handleChoice(card)
    }
    
    return <>
            <div className='card'>
                {/* if card is flipped apply flipped css class, otherwise apply none */}
                <div className={flipped ? 'flipped' : ''}>
                    <img className='front' alt='card-front' src={card.src} />
                    <img src='/img/cover.png' className='back' onClick={handleClick} alt='card-back' />
                </div>
            </div>
           
    </>

}

export default SingleCard