import Canvas from "../../Modules/Graph2D/Canvas";
import Graph2DUI from "../../Modules/Graph2D/Graph2DUI";
import {useEffect} from "react";

const Graph2D = ({}) => {
    const height = 600;
    const width = 600;
    const prop = width / height;
    const WIN = {
        left: -10 * prop,
        bottom: -10,
        width: 20 * prop,
        height: 20,
    };

    const zoomStep = 1;
    let canMove = false;

    const funcs = [];

    let canvas;

    useEffect(() => {
        canvas = new Canvas({
            id: 'canvas2D',
            context: '2d',
            width: width,
            height: height,
            WIN: WIN,
            callbacks: {
                wheel: (event) => wheel(event),
                mouseup: () => mouseUp(),
                mousedown: () => mouseDown(),
                mousemove: (event) => mouseMove(event),
                mouseleave: () => mouseLeave(),
            },
        });
        render();

        return () => {
            canvas = null;
        };
    }, [])

    const wheel = (event) => {
        const delta = (event.wheelDelta > 0) ? -zoomStep : zoomStep;
        if (WIN.width + delta * prop > 0 && WIN.height + delta > 0) {
            WIN.width += prop * delta;
            WIN.height += delta;
            WIN.left -= prop * delta / 2;
            WIN.bottom -= delta / 2;
            render(event);
        }
    }


    const mouseUp = () => {
        canMove = false;
    }

    const mouseDown = () => {
        canMove = true;
    }

    const mouseMove = (event) => {
        if (canMove) {
            WIN.left -= canvas.sx(event.movementX);
            WIN.bottom -= canvas.sy(event.movementY);
        }
        render(event);
    }

    const mouseLeave = () => {
        canMove = false;
        render();
    }

    const createObjectFunc = (num) => {
        funcs[num] = {
            f: null,
            color: '#d00',
            width: 2,
            showZero: false,
            showDerivative: false,
        }
    }

    const addFunc = ({num, f}) => {
        funcs[num].f = f;
        render();
    }
    const addWidth = ({num, width}) => {
        funcs[num].width = width;
        render();

    }
    const addColor = ({num, color}) => {
        funcs[num].color = color;
        render();

    }

    const delFunc = (num) => {

        funcs[num] = null;
        render();

    }
    
    //   const getZero({ f, a, b, eps = 0.0001 }) {
    //     if (f(a) * f(b) > 0) return null;
    //     if (f(a) === 0) return a;
    //     if (f(b) === 0) return b;
    //     if (Math.abs(f(b) - f(a) <= eps)) return (a + b) / 2;
    //     const half = (a + b) / 2;
    //     if (f(a) * f(half) <= 0) return getZero({ f, a, b: half, eps })
    //     if (f(b) * f(half) <= 0) return getZero({ f, a: half, b, eps })
    //     else return null;
    // }

    const printOXY = () => {
        for (let i = 0; i <= WIN.left + WIN.width; i++) {
            canvas.line({ x1: i, y1: WIN.bottom, x2: i, y2: WIN.bottom + WIN.height, color: '#c1c1c1' });
        }
        for (let i = 0; i >= WIN.left; i--) {
            canvas.line({ x1: i, y1: WIN.bottom, x2: i, y2: WIN.bottom + WIN.height, color: '#c1c1c1' });
        }
        for (let i = 0; i <= WIN.bottom + WIN.height; i++) {
            canvas.line({ x1: WIN.left, y1: i, x2: WIN.left + WIN.width, y2: i, color: '#c1c1c1' });
        }
        for (let i = 0; i >= WIN.bottom; i--) {
            canvas.line({ x1: WIN.left, y1: i, x2: WIN.left + WIN.width, y2: i, color: '#c1c1c1' });
        }
        canvas.line({ x1: WIN.left, y1: 0, x2: WIN.width + WIN.left, y2: 0, width: 2, color: '#c1c1c1' });
        canvas.line({ x1: 0, y1: WIN.bottom, x2: 0, y2: WIN.bottom + WIN.height, width: 2,  color: '#c1c1c1' });

        canvas.line({ x1: WIN.width + WIN.left, y1: 0, x2: WIN.width + WIN.left - 0.6, y2: 0.3, width: 2,  color: '#c1c1c1' });
        canvas.line({ x1: WIN.width + WIN.left, y1: 0, x2: WIN.width + WIN.left - 0.6, y2: -0.3, width: 2,  color: '#c1c1c1' });
        canvas.line({ x1: 0, y1: WIN.bottom + WIN.height, x2: 0.3, y2: WIN.bottom + WIN.height - 0.6, width: 2,  color: '#c1c1c1' });
        canvas.line({ x1: 0, y1: WIN.bottom + WIN.height, x2: -0.3, y2: WIN.bottom + WIN.height - 0.6, width: 2,  color: '#c1c1c1' });
    }

    const printZeros = ({ f, color = 'red', x, dx }) => {
        if (f(x) * f(x + dx) <= 0) {
            canvas.point({ x: x + dx / 2, y: 0, color })
        }
    }

    const getDerivative = (f, x0, dx = 0.00001) => {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    const printDerivative = ({f, x}) => {
        const k = getDerivative(f, x)
        let b = f(x) - k * x;
        let x1 = WIN.left;
        let x2 = WIN.left + WIN.width;
        let y1 = k * x1 + b;
        let y2 = k * x2 + b;
        canvas.line({x1: x1, y1: y1, x2: x2, y2: y2, width: 1, color: 'darkred', isDach: true});
    }

    /*const printDerivative = ({ f, x }) => {
        const dx = Math.pow(10, -9);
        const k = (f(x + dx) - f(x)) / dx;
        const b = f(x) - k * x;
        canvas.line({ x1: b, y1: 0, x2: x, y2: f(x), color: '#aaa' })
        canvas.line({ x1: x, y1: 0, x2: x, y2: f(x), color: '#aaa', isDash: true })
    }*/

    const printFunction = ({ f, color = 'red', width = 2, showZero }) => {
        const dx = WIN.width / 1000;
        let x = WIN.left;
        while (x < WIN.width + WIN.left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < WIN.height) {
                canvas.line({ x1: x, y1: f(x), x2: x + dx, y2: f(x + dx), color: color, width: width });
                if (showZero) {
                    printZeros({ f, x, dx });
                }
            }
            else {
                canvas.line({ x1: x, y1: f(x), x2: x + dx, y2: f(x + dx), color: color, width: width, isDash: true });
            }

            x += dx;
        }
    }

    const printNums = () => {
        const streakLength = WIN.height / (WIN.width + 30);
        const len = streakLength / 2;
        const shiftY = -WIN.height * 0.01 - 0.04;
        const shiftX = WIN.width * 0.001 + 0.04;
        for (let i = Math.round(WIN.left); i < WIN.left + WIN.width; i++) {
            canvas.line({ x1: i, y1: len, x2: i, y2: -len, width: 2.5, color: '#c1c1c1' });
            canvas.printText({ text: i, x: i + shiftX, y: shiftY, });
        }
        for (let i = Math.round(WIN.bottom); i < WIN.bottom + WIN.height; i++) {
            canvas.line({ x1: len, y1: i, x2: -len, y2: i, width: 2.5, color: '#c1c1c1' });
            canvas.printText({ text: i, x: shiftX, y: i + shiftY, });
        }
    }

    const printRect = (event) => {
        const x = Math.floor(canvas.x(event.offsetX));
        const y = Math.floor(canvas.y(event.offsetY) + 1);
        canvas.drawRect({ x: x, y: y, width: 1, height: 1, color: 'red' });
    }

    const render = (event) => {
        canvas.clear();
        printOXY();
        printNums();
        if(event) {
            printRect(event)
        }
        funcs.forEach(func => {
            if (func) {
                printFunction({ f: func.f, color: func.color, width: func.width, showZero: func.showZero })
            }
            // if (func.showDerivative) {
            //     const x = canvas.x(event.offsetX);
            //     printDerivative({ f: func.f, x })
            // }
        });
    }

    return(
        <div className = 'Graph2D'>
            <Graph2DUI
                createObjectFunc={(num) => createObjectFunc(num)}
                addFunction={({num, f}) => addFunc({num, f})}
                addWidth={({num, width}) => addWidth({num, width})}
                addColor={({num, color}) => addColor({num, color})}
                deleteFunction={(num) => delFunc(num)}
            />
            <canvas id = "canvas2D"></canvas>
        </div>
    )
    
}
export default Graph2D;