import { useCallback, useState } from 'react';

import FigureBlock from './FigureBlock/FigureBlock';

import './SceneBlock.css';

const SceneBlock = ({ scene, figuresCallbacks, deleteFigure }) => {

    const [delFigure, setDelFigure] = useState(0);

    const deleteFigureHandler = useCallback((index) => {
        setDelFigure(delFigure + 1);
        deleteFigure(index);
    }, [deleteFigure, setDelFigure, delFigure])

    return (
        <div className='scene-block' >
            {
                (scene.filter((figure) => figure)).map((figure, index) => {
                    return (
                        <div
                            key={index}
                            className='figure-block'
                        >
                            <FigureBlock
                                figure={figure}
                                callbacks={figuresCallbacks}
                                deleteFigureHandler={deleteFigureHandler}
                            />
                        </div>
                    )
                })
            }
        </div >
    )
}

export default SceneBlock;