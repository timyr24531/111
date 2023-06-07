import { useEffect, useRef } from "react";

const Cylinder = ({ callbacks, figure }) => {

    const refRadius = useRef(null);
    const refCount = useRef(null);
    const refHeight = useRef(null);

    useEffect(() => {
        refRadius.current.value = figure.radius ? figure.radius : '';
        refCount.current.value = figure.count ? figure.count : '';
        refHeight.current.value = figure.height ? figure.height : '';
    });


    return (
        <>
            <input
                ref={refRadius}
                type="number"
                placeholder="Радиус"
                onChange={() => callbacks.changeRadius(figure, refRadius.current.value - 0)}
            />
            <input
                ref={refCount}
                type="number"
                placeholder="Кольца"
                onChange={() => callbacks.changeCount(figure, refCount.current.value - 0)}
            />
            <input
                ref={refHeight}
                type="number"
                placeholder="Высота"
                onChange={() => callbacks.changeHeight(figure, refHeight.current.value - 0)}
            />
        </>
    )
}

export default Cylinder;