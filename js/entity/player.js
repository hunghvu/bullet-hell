class Player {
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        // Link sprite sheet
        this.spriteSheet = ASSET_MANAGER.getAsset("./assets/sprites/playerSprite.png");

        // Frames for animation
        this.animation = [];
        this.loadAnimations();
        this.canvasX = 0;
        this.canvasY = 0;
    }

    loadAnimations() {
        // for (var i = 0; i < 8; i++) {
            // this.animation[0] = new Animator(this.spriteSheet, 16, 16 , 32, 48, 8, 0.5, 0, false, true);
            let reimu = new Animator(this.spriteSheet, 16, 16, 32, 48, 8, 0.125, 0, false, true)
            this.animation.push(reimu);
            // console.log(reimu);
        // }
    }

    update() {

    }

    draw(ctx) {
        // for(var i = 0; i < 8; i++) {
            this.animation[0].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, 3);
        // }
    }
}