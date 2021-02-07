/**
 * This class represents player's score.
 */
class Score {
    constructor (weapon, canvas, enemy) {
        this.weapon = weapon;
        this.bullet = weapon.bullet;
        this.canvas = canvas;
        this.enemy = enemy;
        // There is another canvas for info board to separate from game canvas.
        // Therefore, ctx passed to draw will not be used
        this.ctxInfoBoard = canvas.getContext("2d");
    }

    update() {
        this.bullet = this.weapon.bullet;
        this.ctxInfoBoard.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(ctx){
        this.ctxInfoBoard.font = "30px Arial";
        // For testing only
        this.ctxInfoBoard.fillText(this.enemy.damageReceived, 10, 50);
    }
}