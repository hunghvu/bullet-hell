class Bullet {
    constructor(animator, x, y, side, boundingCircle, bulletManager){
        Object.assign(this, {animator, x, y, side, boundingCircle, bulletManager});
        this.removeFromWorld = false;
    }

    update() {

    }

    draw() {

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

 


}