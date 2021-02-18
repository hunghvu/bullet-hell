/**
 * This class represents a generic bullet in game.
 */
class Bullet {
    constructor(animator, x, y, side, boundingCircle, bulletManager, damage){
        Object.assign(this, {animator, x, y, side, boundingCircle, bulletManager, damage});
        this.removeFromWorld = false;
    }

    update() {

    }

    draw() {
        /**
         * @todo, find a way to move all draw operations to this class.
         */
    }

    /**
     * This function decides whether a bullet is removable from a map.
     */
    isRemovable() {
        this.y <= 0 ? this.removeFromWorld = true : this.removeFromWorld = false;
        return this.y <= 0;
    }

    /**
     * This function update the location of a bullet.
     */
    updateLocation() {
        this.y -= this.bulletManager.bulletSpeed;

        // this.y -= this.bulletSpeed;
        // Manually tune the location of circle.
        if (this.side === null) {
            this.boundingCircle.setLocation(this.x, this.y);
        } else if (this.side === "left") {
            this.x -= this.bulletManager.bulletSpeed / 5;
            this.boundingCircle.setLocation(this.x + 10, this.y + 10);
        } else if (this.side === "right") {
            this.x += this.bulletManager.bulletSpeed / 5;
            this.boundingCircle.setLocation(this.x + 35, this.y + 10);
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