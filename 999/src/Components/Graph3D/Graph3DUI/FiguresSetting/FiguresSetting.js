import { useState } from "react";

import SceneBlock from "./SceneBlock/SceneBlock";
import FiguresList from "./FiguresList/FiguresList";

import './FiguresSetting.css';

const FiguresSetting = ({
    addFigure,
    showHideAddList,
    figuresList,
    showAddList,
    scene,
    figuresCallbacks,
    deleteFigure
}) => {

    const [figureCounter, setFigureCounter] = useState(0);

    const addFigureOnClickHandler = (figure) => {
        addFigure(figure, figureCounter + 1);
        setFigureCounter(figureCounter + 1);
    }

    return (
        <div className="figures-setting">
            <div className="add-figure-block">
                <div
                    className="add-figure-button"
                    onClick={showHideAddList}>Добавить фигуру</div>
                {showAddList ? <FiguresList
                    figures={figuresList}
                    onClick={addFigureOnClickHandler}
                /> :
                    <></>
                }
            </div>
            <SceneBlock
                scene={scene}
                figuresCallbacks={figuresCallbacks}
                deleteFigure={deleteFigure}
            />
        </div>
    )
}

export default FiguresSetting;