/**
 * This class represents player's score.
 */
class Score {
    constructor (weapon, canvas, enemy, player) {


        this.weapon = weapon;
        this.bullet = weapon.bullet;
        this.canvas = canvas;
        this.enemy = enemy;
        this.player = player;
        // There is another canvas for info board to separate from game canvas.
        // Therefore, ctx passed to draw will not be used
        this.ctxInfoBoard = canvas.getContext("2d");

        this.backgroundScore = new Image();
        this.backgroundScore.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;
    }

    update() {
        this.bullet = this.weapon.bullet;
        this.ctxInfoBoard.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(ctx){

        this.ctxInfoBoard.drawImage(this.backgroundScore, 771, 1, 256, 255, 0, 0, 200, 768);
        this.ctxInfoBoard.font = "20px Arial";
        this.ctxInfoBoard.fillStyle = "Red";
        // For testing only
        this.ctxInfoBoard.fillText("Dmg received (enemy): ", 10, 50)
        this.ctxInfoBoard.fillText(this.enemy.damageReceived, 10, 70);

        this.ctxInfoBoard.fillText("Player's HP: ", 10, 100)
        this.ctxInfoBoard.fillText(this.player.damageThreshold - this.player.damageReceived, 10, 120);
    }
}