import { Figure, Point, Edge, Polygon } from "../entities";

export default class Cube extends Figure {
    constructor({
        color = '#DA70D6',
        size = 10,
        centre,
        name = 'Куб',
    }) {
        super({ color, centre, name });
        this.size = size;

        this.generateFigure();
    }

    generatePoints() {
        const size = this.size / 2;
        this.points = [
            new Point(size + this.centre.x, size + this.centre.y, size + this.centre.z),
            new Point(-size + this.centre.x, size + this.centre.y, size + this.centre.z),
            new Point(size + this.centre.x, -size + this.centre.y, size + this.centre.z),
            new Point(-size + this.centre.x, -size + this.centre.y, size + this.centre.z),
            new Point(size + this.centre.x, size + this.centre.y, -size + this.centre.z),
            new Point(size + this.centre.x, -size + this.centre.y, -size + this.centre.z),
            new Point(-size + this.centre.x, size + this.centre.y, -size + this.centre.z),
            new Point(-size + this.centre.x, -size + this.centre.y, -size + this.centre.z),
        ];
    }

    generateEdges() {
        this.edges = [
            new Edge(0, 4),
            new Edge(0, 1),
            new Edge(0, 2),
            new Edge(6, 1),
            new Edge(6, 4),
            new Edge(6, 7),
            new Edge(5, 7),
            new Edge(5, 4),
            new Edge(5, 2),
            new Edge(3, 7),
            new Edge(3, 2),
            new Edge(3, 1),
        ];
    }

    generatePolygons() {
        this.polygons = [
            new Polygon([0, 1, 3, 2], this.color),
            new Polygon([0, 1, 6, 4], this.color),
            new Polygon([0, 2, 5, 4], this.color),
            new Polygon([2, 3, 7, 5], this.color),
            new Polygon([3, 1, 6, 7], this.color),
            new Polygon([4, 5, 7, 6], this.color),
        ]
    }
}