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
        this.state = 0; // 0 means stands still, 1 is moving to the left, 2 is moving to the right.
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        // Orb angle.
        this.orbSpeed = 1;
        this.orbAngle = 0;
        this.radius = 80;
    }

    /**
     * This function helps moving the character around based on mouse movement.
     * @param {canvas} canvas Canvas for game.
     */
    addMouseListenerCanvas(canvas) {
        // A separate timer to detect if the mouse has stopped moving
        //  Source: https://stackoverflow.com/questions/17646825/how-to-detect-when-mouse-has-stopped
        let timer = null;
        canvas.addEventListener('mousemove', event => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                this.state = 0;
                this.lastMouseX = event.clientX;
                this.lastMouseY = event.clientY;
            }, 500);

            // Only get mouse coordinate inside canvas
            let canvasRect = canvas.getBoundingClientRect();
            let newMouseX = event.clientX - canvasRect.left;
            let newMouseY = event.clientY - canvasRect.top;

            // Change state of direction
            if (newMouseX < this.lastMouseX) {
                this.state = 1;
            } else if (newMouseX === this.lastMouseX) {
                this.state = 0;
            } else if (newMouseX > this.lastMouseX) {
                this.state = 2;
            }

            //
            this.lastMouseX = newMouseX; // Real mouse position
            this.lastMouseY = newMouseY;
            this.canvasX = newMouseX - 40; // Modified position so the mouse is at
            this.canvasY = newMouseY - 48; //  the center of character sprite

            console.log(this.state);
        })
    }

    loadAnimations() {

        let playerStill = new Animator(this.spriteSheet, 16, 16, 32, 48, 8, 0.125, 0, false, true);
        let playerLeft = new Animator(this.spriteSheet, 16, 64, 32, 48, 8, 0.125, 0, false, true);
        let playerRight = new Animator(this.spriteSheet, 16, 112, 32, 48, 8, 0.125, 0, false, true);
        this.animation.push(playerStill);
        this.animation.push(playerLeft);
        this.animation.push(playerRight);

        let orb = new Animator (this.spriteSheet, 96, 160, 16, 16, 1, 0.125, 0, false, true);
        this.animation.push(orb); // At index 3.

    }

    update() {

    }

    draw(ctx) {



        this.animation[this.state].drawFrame(this.game.clockTick, ctx, this.canvasX, this.canvasY, 3);

        let radian = -this.orbAngle * Math.PI / 180;

        // Manually adjust magic number so the orb can fly around the character.
        // As the character shap is not symmetric, this have to be done manually.
        this.animation[3].drawFrame(this.game.clockTick, ctx, 
            this.canvasX + 24 + this.radius * Math.cos(radian),
            this.canvasY + 30 + this.radius * Math.sin(radian),
            3
            )
        this.orbAngle += this.orbSpeed;

    }
}