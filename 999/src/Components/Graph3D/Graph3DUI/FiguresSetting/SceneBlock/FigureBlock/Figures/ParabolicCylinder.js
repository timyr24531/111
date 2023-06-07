import { useRef, useEffect } from "react";

const ParabolicCylinder = ({ callbacks, figure }) => {
    const refCount = useRef(null);
    const refHeight = useRef(null);
    const refFocusX = useRef(null);

    useEffect(() => {
        refCount.current.value = figure.count ? figure.count : '';
        refHeight.current.value = figure.height ? figure.height : '';
        refFocusX.current.value = figure.focusOx ? figure.focusOx : '';
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
        </>
    )
}

export default ParabolicCylinder;