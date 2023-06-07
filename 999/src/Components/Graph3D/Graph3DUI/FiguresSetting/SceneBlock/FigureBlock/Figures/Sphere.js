import { useRef, useEffect } from "react";

const Sphere = ({ callbacks, figure }) => {
    const refRadius = useRef(null);
    const refCount = useRef(null);

    useEffect(() => {
        refRadius.current.value = figure.radius ? figure.radius : '';
        refCount.current.value = figure.count ? figure.count : '';
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
                ref={refCount}
                type="number"
                placeholder="Кольца"
                onChange={() => callbacks.changeCount(figure, refCount.current.value - 0)}
            />
        </>
    )
}

export default Sphere;