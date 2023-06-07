import './FiguresList.css';

const FiguresList = ({ figures, onClick }) => {
    return (
        <div className='figures-list'>
            <div>
                {figures.map((figure, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => onClick(figure.text)}
                            className='figure-button'>
                            {figure.text}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FiguresList;