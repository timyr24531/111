import Canvas from "./Canvas";

const useCanvas = (render = () => { }) => {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 15);
            }
    })();

    let FPS = 0;
    let outFPS = 0;
    let lastTimestamp = Date.now();
    const animLoop = () => {
        FPS++;
        const timestamp = Date.now();
        if (timestamp - lastTimestamp >= 1000) {
            outFPS = FPS;
            FPS = 0;
            lastTimestamp = timestamp;
        }
        render(outFPS);
        window.requestAnimFrame(animLoop);
    }

    return (params) => {
        animLoop();
        return new Canvas(params);
    }
}
export default useCanvas;