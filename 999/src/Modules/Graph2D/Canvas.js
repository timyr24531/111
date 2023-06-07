class Canvas {
    constructor({ id, context, width = 800, height = 500, WIN, callbacks }) {

        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext(context);

        this.canvas.width = width;
        this.canvas.height = height;

        const { wheel, mouseup, mousedown, mousemove, mouseleave } = callbacks;
        this.canvas.addEventListener('wheel', wheel);
        this.canvas.addEventListener('mousedown', mousedown);
        this.canvas.addEventListener('mouseup', mouseup);
        this.canvas.addEventListener('mousemove', mousemove);
        this.canvas.addEventListener('mouseleave', mouseleave);

        this.WIN = WIN;
    }

    xs = (x) => (x - this.WIN.left) / this.WIN.width * this.canvas.width;

    ys = (y) => this.canvas.height - (y - this.WIN.bottom) / this.WIN.height * this.canvas.height;

    sx = (x) => x * this.WIN.width / this.canvas.width;

    sy = (y) => -y * this.WIN.height / this.canvas.height;

    x = (xs) => xs * this.WIN.width / this.canvas.width + this.WIN.left;

    y = (ys) => -ys * this.WIN.height / this.canvas.height + this.WIN.bottom + this.WIN.height;

    drawRect = ({ x, y, width, height, color }) => {
        const heightRect = height * this.canvas.height / this.WIN.height;
        const widthRect = width * this.canvas.width / this.WIN.width;

        this.context.fillStyle = color;
        this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);

    }

    clear = () => {
        this.context.fillStyle = 'MediumBlue';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line = ({ x1, y1, x2, y2, width = 1, color = 'red', isDash = false }) => {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.moveTo(this.xs(x1), this.ys(y1));
        if (isDash) {
            this.context.lineWidth = 1;
            this.context.setLineDash([10, 10]);
        } else {
            this.context.lineWidth = width;
            this.context.setLineDash([]);
        }
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
        this.context.closePath();
    }
    
    point = ({ x, y, color = '#c00000', size = 2 }) => {
        this.context.beginPath();
        this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }
    printText( text, x, y) {
        this.context.fontsize = 3;
        this.context.fillStyle = 'black';
        this.context.fillText(text, this.xs(x), this.ys(y));
    }

    polygon = (points, color) => {
        this.context.beginPath();
        this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
    }
}
export default Canvas;
