/**
 * This class represents background of the game.
 */
class MenuMain {
    constructor (game, x, y){
        Object.assign(this, {game, x, y});
        this.background = new Image(); // Set up menu background.
        this.background.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        // ctx.font = "44px Akaya Kanadaka";
        // ctx.fillStyle = "White";
        // ctx.fillText("Start", canvas.width / 12 * 5, canvas.height / 5 * 3); // Origin of fill text is bottom left, not top left.

        this.canvasInfoBoard = document.getElementById("infoBoard");
        this.ctxInfoBoard = this.canvasInfoBoard.getContext("2d");

        this.infoBoardBackground = new Image(); // Set up infoboard background, kind of redundant because it is hidden.
        this.infoBoardBackground.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        this.startButtonAreaX = 0;
        this.startButtonAreaY = 0;

        this.startButtonCanvas = document.createElement("canvas");
        this.startButtonCtx =  this.startButtonCanvas.getContext("2d");


    }

    addMainMenuListener(canvas) {
        canvas.addEventListener('mousemove', event => {

            // Only get mouse coordinate inside canvas
            let canvasRect = canvas.getBoundingClientRect();
            let newMouseX = event.clientX - canvasRect.left;
            let newMouseY = event.clientY - canvasRect.top;
            
            if(newMouseX >= this.startButtonAreaX && newMouseX <= this.startButtonAreaX + 100
                && newMouseY >= this.startButtonAreaY && newMouseY <= this.startButtonAreaY + 50) {
                    // this.startButtonCtx.clearRect(0, 0, this.startButtonCanvas.width, this.startButtonCanvas.height);
                    // ctx.drawImage(startButtonCanvas, startButtonAreaX, startButtonAreaY)
                    // console.log(true)
                    // startButtonCtx.fillStyle = "Red";
                    // startButtonCtx.fillText("Start", 0, 50); // Origin of fill text is bottom left, not top left.
            } 
        })



    }

    setInitialButtonLocation(canvas){
        //Menu choices location
        this.startButtonAreaX = canvas.width / 12 * 5;
        this.startButtonAreaY = canvas.height / 5 * 3 - 50
    }



    update(){

    }

    draw(ctx){
        // console.log(true);
        ctx.drawImage(this.background, 513, 256, 256, 255, 0, 0, 388, 768);
        // this.privateDrawButton(ctx);
        // this.ctxInfoBoard.drawImage(this.infoBoardBackground, 771, 1, 256, 255, 0, 0, 200, 768);
    }

    privateDrawButton(ctx) {

        this.startButtonCanvas.width = 100;
        this.startButtonCanvas.height = 50;

        this.startButtonCtx.font = "44px Akaya Kanadaka";
        this.startButtonCtx.fillStyle = "White";
        this.startButtonCtx.fillText("Start", 0, 50); // Origin of fill text is bottom left, not top left.
        ctx.drawImage( this.startButtonCanvas, this.startButtonAreaX, this.startButtonAreaY);
    }
}