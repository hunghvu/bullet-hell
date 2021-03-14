/**
 * This class represents player's score.
 */
class InfoBoard {
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

        // Logic-wise, this is really weird.
        //  1. Bullet should handle its own sound, however, too many bullet => too many sound being played and therefore
        //    the quality is heavily reduced due to multiple repeat.
        //  2. We can use as a background in background.js, however, the match conclusion is in this class, so we
        //    need to put this in here so the interval can be canceled.
        this.bulletSound = setInterval(() => {
            ASSET_MANAGER.playAsset("./assets/sound/bullet-shot.mp3");
        }, 100);
    }

    update() {
        this.bullet = this.weapon.bullet;
        this.ctxInfoBoard.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(ctx){

        this.ctxInfoBoard.drawImage(this.backgroundScore, 771, 1, 256, 255, 0, 0, 200, 768);
        this.ctxInfoBoard.font = "24px Akaya Kanadaka";
        this.ctxInfoBoard.fillStyle = "Red";
        // Mainly for testing, but may keep them as is.

        let stage;
        if (!this.enemy.firstStageDone) {
            stage = 1;
        }
        if (this.enemy.firstStageDone && !this.enemy.secondStageDone) {
            stage = 2;
        }
        if (this.enemy.secondStageDone) {
            stage = 3;
        }
        this.ctxInfoBoard.fillText("Stage: " + stage + " / 3", 10, 50)
        this.ctxInfoBoard.fillText("Enemy's HP: ", 10, 100)
        this.ctxInfoBoard.fillText(Math.max(0, this.enemy.initialHealth - this.enemy.damageReceived) + " / " + this.enemy.initialHealth, 10, 120);
        this.ctxInfoBoard.fillText("Player's HP: ", 10, 150)
        this.ctxInfoBoard.fillText(Math.max(0, this.player.initialHealth) + " / " + this.player.maxHP, 10, 170);

        if (this.enemy.firstStageDone && this.enemy.secondStageDone && this.enemy.thirdStageDone) {
            createResultMenu(true);
            clearInterval(this.bulletSound);
        }
        if (this.player.initialHealth <= 0) { // This is put here, rather then in player b/c the info should be printed before display match result.
            createResultMenu(false);
            clearInterval(this.bulletSound);
        }
    }
}