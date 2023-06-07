//EllipticalParaboloid
import { useRef, useEffect } from "react";

const EllipticalParaboloid = ({ callbacks, figure }) => {
    const refCount = useRef(null);
    const refHeight = useRef(null);
    const refFocusX = useRef(null);
    const refFocusY = useRef(null);
    const refFocusZ = useRef(null);

    useEffect(() => {
        refCount.current.value = figure.count ? figure.count : '';
        refHeight.current.value = figure.height ? figure.height : '';
        refFocusX.current.value = figure.focusOx ? figure.focusOx : '';
        refFocusY.current.value = figure.focusOy ? figure.focusOy : '';
        refFocusZ.current.value = figure.focusOz ? figure.focusOz : '';
    })
    return (
        <>
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
            <input
                ref={refFocusX}
                type="number"
                placeholder="Фокус OX"
                onChange={() => callbacks.changeFocusX(figure, refFocusX.current.value - 0)}
            />
            <input
                ref={refFocusY}
                type="number"
                placeholder="Фокус OY"
                onChange={() => callbacks.changeFocusY(figure, refFocusY.current.value - 0)}
            />
            <input
                ref={refFocusZ}
                type="number"
                placeholder="Фокус OZ"
                onChange={() => callbacks.changeFocusZ(figure, refFocusZ.current.value - 0)}
            />
        </>
    )
}

export default EllipticalParaboloid;