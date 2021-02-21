/**
 * This class represents background of the game, which includes both background IMG and BGM.
 */
class Background {
    constructor (game, x, y){
        Object.assign(this, {game, x, y});
        // A work around to display parallax background. 
        //  Technically, it should be determined by the camera instead. 
        this.speedNear = 0.5; // the background seems to vibrate on low speed on a large screen?
        this.backgroundNear = new Image();
        this.backgroundNear.src = ASSET_MANAGER.getAsset("./assets/background-near.png").src;
        this.backgroundNearPositionY = 0;

        this.speedFar = 0.3;
        this.backgroundFar = new Image();
        this.backgroundFar.src = ASSET_MANAGER.getAsset("./assets/background-far.png").src;
        this.backgroundFarPositionY = 0;
        this.canvas = null;

        // Background music.
        ASSET_MANAGER.pauseBackgroundMusic();
        ASSET_MANAGER.playAsset("./assets/sound/background-ingame.mp3");
        ASSET_MANAGER.autoRepeat("./assets/sound/background-ingame.mp3");
        ASSET_MANAGER.adjustVolume(0.1);
    }

    setBackgroundInitialPosition(canvas){
        this.canvas = canvas;
        // console.log(this.backgroundNear.src);
        this.backgroundNearPositionY = (this.backgroundNear.height - this.canvas.height) * -1;
        this.backgroundFarPositionY = (this.backgroundFar.height - this.canvas.height) * -1;
    }

    update(){

    }

    draw(ctx){
        // Draw the image off canvas then gradually move it.
        // Image top left will start at negative y (y south, x east) and move toward y = canvas height.
        // There will be another image right after so it feels continuous/infinite
        // The transition of background-far is not that smooth compared to near, but it is hidden
        //  by the opacity of near => unnoticable
        ctx.drawImage(this.backgroundFar, 0, this.backgroundFarPositionY - this.backgroundFar.height);
        ctx.drawImage(this.backgroundFar, 0, this.backgroundFarPositionY );
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.drawImage(this.backgroundNear, 0, this.backgroundNearPositionY - this.backgroundNear.height);
        ctx.drawImage(this.backgroundNear, 0, this.backgroundNearPositionY);

        ctx.restore();
        if (this.backgroundNearPositionY <= ctx.canvas.height) {
            this.backgroundNearPositionY += this.speedNear;
        } else { 
            this.backgroundNearPositionY = (this.backgroundNear.height - this.canvas.height) * -1;
        }

        if(this.backgroundFarPositionY <= ctx.canvas.height) {
            this.backgroundFarPositionY += this.speedFar;
        } else {
            this.backgroundFarPositionY = (this.backgroundFar.height - this.canvas.height) * -1;
        }
    }
}