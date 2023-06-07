import { useRef, useEffect } from "react";

const HyperbolicParaboloid = ({ callbacks, figure }) => {
    const refCount = useRef(null);
    const refFocusX = useRef(null);
    const refFocusZ = useRef(null);

    useEffect(() => {
        refCount.current.value = figure.count ? figure.count : '';
        refFocusX.current.value = figure.focusOx ? figure.focusOx : '';
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
                ref={refFocusX}
                type="number"
                placeholder="Фокус OX"
                onChange={() => callbacks.changeFocusX(figure, refFocusX.current.value - 0)}
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

export default HyperbolicParaboloid;