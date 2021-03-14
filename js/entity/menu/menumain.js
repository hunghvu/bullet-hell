/**
 * This class represents main menu of the game.
 */
class MenuMain {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.background = new Image(); // Set up menu background.
        this.background.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        // ctx.font = "44px Akaya Kanadaka";
        // ctx.fillStyle = "White";
        // ctx.fillText("Start", canvas.width / 12 * 5, canvas.height / 5 * 3); // Origin of fill text is bottom left, not top left.

        this.canvasInfoBoard = document.getElementById("infoBoard");
        this.ctxInfoBoard = this.canvasInfoBoard.getContext("2d");

        this.infoBoardBackground = new Image(); // Set up infoboard background, kind of redundant because it is hidden.
        this.infoBoardBackground.src = ASSET_MANAGER.getAsset("./assets/background-score.png").src;

        this.easyButtonAreaX = 0;
        this.easyButtonAreaY = 0;

        this.easyButtonCanvas = document.createElement("canvas");
        this.easyButtonCtx = this.easyButtonCanvas.getContext("2d");

        this.normalButtonCanvas = document.createElement("canvas");
        this.normalButtonCtx = this.normalButtonCanvas.getContext("2d");

        this.hardButtonCanvas = document.createElement("canvas");
        this.hardButtonCtx = this.hardButtonCanvas.getContext("2d");

        this.lunaticButtonCanvas = document.createElement("canvas");
        this.lunaticButtonCtx = this.lunaticButtonCanvas.getContext("2d");

        this.easyButtonHover = false;
        this.normalButtonHover = false;
        this.hardButtonHover = false;
        this.lunaticButtonHover = false;


    }

    addMainMenuListener(canvas) {
        // Technically the menu is still there, but it is hidden behind a game screen layer, so might not be a problem.
        canvas.addEventListener("click", event => {this.privateCaptureButtonClick(event)}, {once: true});
        canvas.addEventListener("mousemove", event => {this.privateButtonVisualEffect(event)});

    }

    setInitialButtonLocation(canvas) {
        //Menu choices location
        this.easyButtonAreaX = canvas.width / 12 * 5;
        this.easyButtonAreaY = canvas.height / 5 * 2.5 - 50; // Origin of fill text is bottom left, not top left (?)

        this.normalButtonAreaX = canvas.width / 12 * 5;
        this.normalButtonAreaY = canvas.height / 5 * 2.5 + 25; // Origin of fill text is bottom left, not top left (?)

        this.hardButtonAreaX = canvas.width / 12 * 5;
        this.hardButtonAreaY = canvas.height / 5 * 2.5 + 100; // Origin of fill text is bottom left, not top left (?)

        this.lunaticButtonAreaX = canvas.width / 12 * 5;
        this.lunaticButtonAreaY = canvas.height / 5 * 2.5 + 175; // Origin of fill text is bottom left, not top left (?)
    }



    update() {

    }

    draw(ctx) {
        // console.log(true);
        ctx.drawImage(this.background, 513, 256, 256, 255, 0, 0, 388, 768);
        this.privateDrawAllButton(ctx);
        // this.ctxInfoBoard.drawImage(this.infoBoardBackground, 771, 1, 256, 255, 0, 0, 200, 768);
    }

    privateDrawAllButton(ctx) {
        this.privateDrawSpecificButton(this.easyButtonCanvas, this.easyButtonCtx, this.easyButtonHover, 
            this.easyButtonAreaX, this.easyButtonAreaY, ctx, "Easy");
        this.privateDrawSpecificButton(this.normalButtonCanvas, this.normalButtonCtx, this.normalButtonHover, 
            this.normalButtonAreaX, this.normalButtonAreaY, ctx, "Normal");
        this.privateDrawSpecificButton(this.hardButtonCanvas, this.hardButtonCtx, this.hardButtonHover, 
            this.hardButtonAreaX, this.hardButtonAreaY, ctx, "Hard");
        this.privateDrawSpecificButton(this.lunaticButtonCanvas, this.lunaticButtonCtx, this.lunaticButtonHover, 
            this.lunaticButtonAreaX, this.lunaticButtonAreaY, ctx, "Lunatic");
    }

    privateDrawSpecificButton(buttonCanvas, buttonCtx, buttonHover, buttonAreaX, buttonAreaY, ctx, buttonLabel) {
        buttonCanvas.width = 150;
        buttonCanvas.height = 75;
        buttonCtx.font = "44px Akaya Kanadaka";
        // Button effect.
        if(buttonHover) {
            // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor
            buttonCtx.shadowColor = 'rgba(255, 255, 255, .8)';
            buttonCtx.shadowBlur = 5;
            buttonCtx.shadowOffsetX = 0;
            buttonCtx.shadowOffsetY = 0;
            buttonCtx.fillStyle = "Red" 
        } else {
            buttonCtx.fillStyle = "White";
        }
        buttonCtx.fillText(buttonLabel, 0, 50); // Origin of fill text is bottom left, not top left.
        ctx.drawImage(buttonCanvas, buttonAreaX, buttonAreaY);
    }

    privateCaptureButtonClick(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if (newMouseX >= this.easyButtonAreaX && newMouseX <= this.easyButtonAreaX + 100
            && newMouseY >= this.easyButtonAreaY && newMouseY <= this.easyButtonAreaY + 50) {
            startGame(8, 0.9, 1000, 1000);
        }

        if (newMouseX >= this.normalButtonAreaX && newMouseX <= this.normalButtonAreaX + 100
            && newMouseY >= this.normalButtonAreaY && newMouseY <= this.normalButtonAreaY + 50) {
            startGame(7, 0.85, 700, 1300);
        }

        if (newMouseX >= this.hardButtonAreaX && newMouseX <= this.hardButtonAreaX + 100
            && newMouseY >= this.hardButtonAreaY && newMouseY <= this.hardButtonAreaY + 50) {
            startGame(6, 0.8, 400, 1500);
        }

        if (newMouseX >= this.lunaticButtonAreaX && newMouseX <= this.lunaticButtonAreaX + 100
            && newMouseY >= this.lunaticButtonAreaY && newMouseY <= this.lunaticButtonAreaY + 50) {
            startGame(5, 0.7, 200, 2000);
        }
    }

    privateButtonVisualEffect(event) {
        // Only get mouse coordinate inside canvas
        let canvasRect = canvas.getBoundingClientRect();
        let newMouseX = event.clientX - canvasRect.left;
        let newMouseY = event.clientY - canvasRect.top;

        if(newMouseX >= this.easyButtonAreaX && newMouseX <= this.easyButtonAreaX + 150
            && newMouseY >= this.easyButtonAreaY && newMouseY <= this.easyButtonAreaY + 50) {
            this.easyButtonHover = true;
        } else {
            this.easyButtonHover = false;
        }

        if(newMouseX >= this.normalButtonAreaX && newMouseX <= this.normalButtonAreaX + 150
            && newMouseY >= this.normalButtonAreaY && newMouseY <= this.normalButtonAreaY + 50) {
            this.normalButtonHover = true;
        } else {
            this.normalButtonHover = false;
        }

        if(newMouseX >= this.hardButtonAreaX && newMouseX <= this.hardButtonAreaX + 150
            && newMouseY >= this.hardButtonAreaY && newMouseY <= this.hardButtonAreaY + 50) {
            this.hardButtonHover = true;
        } else {
            this.hardButtonHover = false;
        }

        if(newMouseX >= this.lunaticButtonAreaX && newMouseX <= this.lunaticButtonAreaX + 150
            && newMouseY >= this.lunaticButtonAreaY && newMouseY <= this.lunaticButtonAreaY + 50) {
            this.lunaticButtonHover = true;
        } else {
            this.lunaticButtonHover = false;
        }
    }
}