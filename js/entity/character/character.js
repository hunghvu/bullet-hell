class Character {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.animation = [];
        this.canvasX = 0;
        this.canvasY = 0;
    }

    get location() {
        return [this.canvasX, this.canvasY];
    }
}