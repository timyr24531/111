import './CalcButton.css';

const CalcButton = ({ onClick, text }) => {
    return (
        <div
            onClick={onClick}
            className='calc-button'
        >
            {text}
        </div>
    )
}

export default CalcButton;