import './SingleCard.css'

const SingleCard = ({card}) => {

    
    return <>
            <div className='card'>
                <div>
                    <img className='front' alt='card-front' src={card.src} />
                    <img src='/img/cover.png' className='back' alt='card-back' />
                </div>
            </div>
           
    </>

}

export default SingleCard