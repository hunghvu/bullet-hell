class Background {
    constructor (game, x, y){
        Object.assign(this, {game, x, y});
        // A work around to display parallax background. 
        //  Technically, it should be determined by the camera instead. 
        this.speed = 0.5;
        this.backgroundNear = new Image();
        this.backgroundNear.src = ASSET_MANAGER.getAsset("./assets/background-near.png").src;
        this.backgroundPositionY = 0;

        this.speedFar = 0.2;
        this.backgroundFar = new Image();
        this.backgroundFar.src = ASSET_MANAGER.getAsset("./assets/background-far.png").src;
        this.backgroundFarPositionY = 0;
        this.canvas = null;
    }

    setBackgroundInitialPosition(canvas){

        this.canvas = canvas;
        // console.log(this.backgroundNear.src);
        this.backgroundPositionY = (this.backgroundNear.height - this.canvas.height) * -1;
        this.backgroundFarPositionY = (this.backgroundNear.height - this.canvas.height) * -1;
    }

    update(){

    }

    draw(ctx){
        // Draw the image off canvas then gradually move it.
        ctx.drawImage(this.backgroundFar, 0, this.backgroundFarPositionY);
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.drawImage(this.backgroundNear, 0, this.backgroundPositionY);
        ctx.restore();
        if (this.backgroundPositionY <= 0) {
            this.backgroundPositionY += this.speed;
            this.backgroundFarPositionY += this.speedFar;
        }
    }
}