import { useRef, useEffect } from "react";

const Tor = ({ callbacks, figure }) => {
    const refRadius = useRef(null);
    const refInnerRadius = useRef(null);

    useEffect(() => {
        refRadius.current.value = figure.radius ? figure.radius : '';
        refInnerRadius.current.value = figure.innerRadius ? figure.innerRadius : '';
    })
    return (
        <>
            <input
                ref={refRadius}
                type="number"
                placeholder="Радиус"
                onChange={() => callbacks.changeRadius(figure, refRadius.current.value - 0)}
            />
            <input
                ref={refInnerRadius}
                type="number"
                placeholder="Внутренний радиус"
                onChange={() => callbacks.changeInnerRadius(figure, refInnerRadius.current.value - 0)}
            />
        </>
    )
}

export default Tor;