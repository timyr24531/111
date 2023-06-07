import { Figure, Point, Edge, Polygon } from "../entities";

export default class Tor extends Figure {
    constructor({
        innerRadius = 20,
        radius = 10,
        count = 20,
        color = '#DA70D6',
        centre,
        name = 'Тор',
    }) {
        super({ color, centre, name });

        this.innerRadius = innerRadius;
        this.radius = radius;
        this.count = count;

        this.generateFigure()
    }

    generatePoints() {
        const sizeProp = 0.5;
        const prop = 2 * Math.PI / this.count;
        for (let i = 0; i < this.count; i++) {
            for (let j = 0; j < this.count; j++) {
                this.points.push(new Point(
                    this.centre.x + sizeProp * (this.innerRadius + this.radius * Math.cos(i * prop)) * Math.cos(j * prop),
                    this.centre.y + sizeProp * this.radius * Math.sin(i * prop),
                    this.centre.z + sizeProp * (this.innerRadius + this.radius * Math.cos(i * prop)) * Math.sin(j * prop),
                ));
            }
        }
    }

    generateEdges() {
        for (let i = 0; i < this.count; i++) {
            const k = i ? i * this.count - 1 : i;
            for (let j = 0; j < this.count - 1; j++) {
                this.edges.push(new Edge(i * this.count + j, i * this.count + j + 1));
                this.edges.push(new Edge((i ? i - 1 : i) * this.count + j, i * this.count + j));
            }
            this.edges.push(new Edge(i * this.count, (i + 1) * this.count - 1));
            this.edges.push(new Edge(k, k + this.count));
            this.edges.push(new Edge(i, this.points.length - this.count + i));
        }
    }

    generatePolygons() {
        for (let i = 0; i < this.count - 1; i++) {
            for (let j = 0; j < this.count - 1; j++) {
                this.polygons.push(new Polygon([
                    i * this.count + j,
                    (i + 1) * this.count + j,
                    (i + 1) * this.count + j + 1,
                    i * this.count + j + 1,
                ], this.color));
            }

            this.polygons.push(new Polygon([
                i * this.count,
                (i + 1) * this.count - 1,
                (i + 2) * this.count - 1,
                (i + 1) * this.count,
            ], this.color));

            this.polygons.push(new Polygon([
                i,
                this.points.length - this.count + i,
                this.points.length - this.count + i + 1,
                i + 1,
            ], this.color))
        }

        this.polygons.push(new Polygon([
            this.points.length - 1,
            this.points.length - this.count,
            0,
            this.count - 1,
        ], this.color));
    }
}