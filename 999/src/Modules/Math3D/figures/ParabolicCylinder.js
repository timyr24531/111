import { Figure, Point, Edge, Polygon } from "../entities"

export default class ParabolicCylinder extends Figure {
    constructor({
        color = '#DA70D6',
        centre,
        count = 20,
        height = 10,
        focusOx = 5,
        name = 'Параболический цилиндр',
    }) {
        super({ color, centre, name });
        this.count = count;
        this.height = height;
        this.focusOx = focusOx;

        this.generateFigure();
    }

    generatePoints() {
        const propI = this.height / this.count;
        const propJ = 2 * Math.PI / this.count;
        const sizeProp = 2;

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + sizeProp * Math.sqrt(this.focusOx * j * propJ),
                    this.centre.y + sizeProp * (i * propI - this.height / 2),
                    this.centre.z + sizeProp * j * propJ,
                ));
            }
        }

        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x - sizeProp * Math.sqrt(this.focusOx * j * propJ),
                    this.centre.y + sizeProp * (i * propI - this.height / 2),
                    this.centre.z + sizeProp * j * propJ,
                ));
            }
        }
    }



    generateEdges() {
        const stepIndex = Math.pow(this.count, 2);
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge(i * this.count + j + stepIndex, i * this.count + j + stepIndex + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + stepIndex + j, i * this.count + stepIndex + j));
            }
        }
        for (let i = 1; i < this.count; i++) {
            this.edges.push(new Edge(i * this.count - 1, (i + 1) * this.count - 1));
            this.edges.push(new Edge(i * this.count + stepIndex - 1, (i + 1) * this.count + stepIndex - 1));
        }
    }

    generatePolygons() {
        const stepIndex = Math.pow(this.count, 2);
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));

                this.polygons.push(new Polygon([
                    i * this.count + stepIndex + j,
                    (i + 1) * this.count + stepIndex + j,
                    (i + 1) * this.count + stepIndex + j + 1,
                    i * this.count + stepIndex + j + 1,
                ], this.color));
            }
        }
    }
}