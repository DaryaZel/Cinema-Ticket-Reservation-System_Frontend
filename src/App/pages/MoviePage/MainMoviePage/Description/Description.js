import './Description.css'

export function Description({ storyline }) {
    return (
        <div className='description'>
            <h3 className='description__title'>
                Storyline
            </h3>
            <p className='description__story-line'>{storyline}</p>
        </div>
    )
}
