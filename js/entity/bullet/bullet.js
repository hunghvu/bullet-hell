class Bullet {
    constructor(animator, x, y, side, boundingCircle, bulletManager){
        Object.assign(this, {animator, x, y, side, boundingCircle, bulletManager});
        this.removeFromWorld = false;
    }

    update() {

    }

    draw() {
        /**
         * @todo, find a way to move all draw operations to this class.
         */
    }

    isRemovable() {
        // console.log(this.y);
        this.removeFromWorld = true;
        return this.y <= 0;
    }
    updateLocation() {
        this.y -= this.bulletManager.bulletSpeed;

        // this.y -= this.bulletSpeed;
        // Manually tune the location of circle.
        if (this.side === null) {
            this.boundingCircle.setLocation(
                this.x, 
                this.y);
        } else if (this.side === "left") {
            this.x -= this.bulletManager.bulletSpeed / 5;
            this.boundingCircle.setLocation(
                this.x + 10, 
                this.y + 10);
        } else if (this.side === "right") {
            this.x += this.bulletManager.bulletSpeed / 5;
            this.boundingCircle.setLocation(
                this.x + 35, 
                this.y + 10);
        }
        
    }

    handleCollision(){
        this.bulletManager.game.entities.forEach( element => {
            if (element.boundingCircle 
                && element.boundingCircle !== this.boundingCircle // Not collide itself
                && element instanceof Enemy // Bullet should only hit enemy. Not collide with previously shot bullet in some cases
                ) {
                if (element.boundingCircle.isCollided(this.boundingCircle)) {
                    // console.log(element);
                }
            }
    })
    }

 


}