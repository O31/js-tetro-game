export class Tetromino {
    constructor(shapeKey, color, cells, id) {
        this.shapeKey = shapeKey;
        this.color = color;
        this.cells = cells;
        this.id = id;
        this.owner = null;
    }
}

