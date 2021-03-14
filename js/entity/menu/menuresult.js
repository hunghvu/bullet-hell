/**
 * This class represent a match conclusion menu.
 */
class MenuResult {
    constructor(game, x, y, result) {
        Object.assign(this, { game, x, y, result }); // result false means lost, true otherwise.
        this.background = new Image(); // Set up menu background.
        this.background.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        // ctx.font = "44px Akaya Kanadaka";
        // ctx.fillStyle = "White";
        // ctx.fillText("Start", canvas.width / 12 * 5, canvas.height / 5 * 3); // Origin of fill text is bottom left, not top left.

        this.canvasInfoBoard = document.getElementById("infoBoard");
        this.ctxInfoBoard = this.canvasInfoBoard.getContext("2d");

        this.infoBoardBackground = new Image(); // Set up infoboard background, kind of redundant because it is hidden.
        this.infoBoardBackground.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        this.playAgainButtonAreaX = 0;
        this.playAgainButtonAreaY = 0;

        this.playAgainButtonCanvas = document.createElement("canvas");
        this.playAgainButtonCtx = this.playAgainButtonCanvas.getContext("2d");

        this.buttonHover = false;

        this.result ? ASSET_MANAGER.playAsset("./assets/sound/background-win.mp3") : ASSET_MANAGER.playAsset("./assets/sound/background-defeat.mp3");
        ASSET_MANAGER.adjustVolume(0.3);


    }

    addMainMenuListener(canvas) {
        // Technically the menu is still there, but it is hidden behind a game screen layer, so might not be a problem.
        canvas.addEventListener("click", event => {this.privateCaptureButtonClick(event)}, {once: true});
        canvas.addEventListener("mousemove", event => {this.privateButtonVisualEffect(event)});

    }

    setInitialButtonLocation(canvas) {
        //Menu choices location
        this.playAgainButtonAreaX = canvas.width / 12 * 3.5;
        this.playAgainButtonAreaY = canvas.height / 5 * 2; // Origin of fill text is bottom left, not top left (?)
    }



    update() {

    }

    draw(ctx) {
        // console.log(true);
        this.result ? ctx.drawImage(this.background, 256, 257, 256, 255, 0, 0, 388, 768) : ctx.drawImage(this.background, 256, 1, 256, 255, 0, 0, 388, 768);
        this.privateDrawButton(ctx);
        // this.ctxInfoBoard.drawImage(this.infoBoardBackground, 771, 1, 256, 255, 0, 0, 200, 768);
    }

    privateDrawButton(ctx) {

        this.playAgainButtonCanvas.width = 250;
        this.playAgainButtonCanvas.height = 125;

        this.playAgainButtonCtx.font = "44px Akaya Kanadaka";
        this.result ? this.playAgainButtonCtx.fillStyle = "Orange" : this.playAgainButtonCtx.fillStyle = "White";
        this.result ? this.playAgainButtonCtx.fillText("You won.", 0, 50) : this.playAgainButtonCtx.fillText("You lost.", 0, 50);
        // Button effect.
        if(this.buttonHover) {
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
            this.playAgainButtonCtx.shadowColor = 'rgba(255, 255, 255, .8)';
            this.playAgainButtonCtx.shadowBlur = 5;
            this.playAgainButtonCtx.shadowOffsetX = 0;
            this.playAgainButtonCtx.shadowOffsetY = 0;
            this.playAgainButtonCtx.fillStyle = "Red" 
        } else {
            this.result ? this.playAgainButtonCtx.fillStyle = "Orange" : this.playAgainButtonCtx.fillStyle = "White";
        }
        this.result ? this.playAgainButtonCtx.fillText("Play again?", 0, 100) : this.playAgainButtonCtx.fillText("Try again?", 0, 100); // Origin of fill text is bottom left, not top left.
        ctx.drawImage(this.playAgainButtonCanvas, this.playAgainButtonAreaX, this.playAgainButtonAreaY);
    }

    privateCaptureButtonClick(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if(newMouseX >= this.playAgainButtonAreaX && newMouseX <= this.playAgainButtonAreaX + 200
            && newMouseY >= this.playAgainButtonAreaY + 50 && newMouseY <= this.playAgainButtonAreaY + 100) {
            createMainMenu();
        }
    }

    privateButtonVisualEffect(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if(newMouseX >= this.playAgainButtonAreaX && newMouseX <= this.playAgainButtonAreaX + 200
            && newMouseY >= this.playAgainButtonAreaY + 50 && newMouseY <= this.playAgainButtonAreaY + 100) {
            this.buttonHover = true;
        } else {
            this.buttonHover = false;
        }
    }
}