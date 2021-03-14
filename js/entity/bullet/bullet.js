/**
 * This class represents a generic bullet in game.
 */
class Bullet {
    constructor(owner,animator, x, y, side, boundingCircle, bulletManager, damage, vector = null){
        Object.assign(this, {owner, animator, x, y, side, boundingCircle, bulletManager, damage, vector});
        this.removeFromWorld = false;
        this.isCollided = false;
        this.radarRadius = 25
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
        (this.y <= 0 || this.y >= 1000 || this.x <= -200 || this.x >= 500 || this.isCollided)
        ? this.removeFromWorld = true : this.removeFromWorld = false;
        return this.removeFromWorld;
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

    /**
     * This function update bullet location with a given vector, used for enemy only. 
     */
    updateLocationWithVector() {
        this.x += this.vector.velX;
        this.y += this.vector.velY;
        this.boundingCircle.setLocationWithVector(this.vector.velX, this.vector.velY);
        if(this.radar) this.radar.setLocationWithVector(this.vector.velX, this.vector.velY);
    }

    /**
     * This will initialize the radar circle for the bullet
     * @param {number} x an original x coord when a bullet is spawned
     * @param {number} y an original y coord when a bullet is spawned
     */
    activateHeatSeeking(x, y) {
        if (this.owner instanceof Enemy) {
            this.radar = new BoundingCircle(x + this.owner.weapon.bullet.frameWidthAndHeight / 2, 
                y + this.owner.weapon.bullet.frameWidthAndHeight / 2, this.radarRadius);
        }
        if (this.owner instanceof Player) {
            this.radar = new BoundingCircle(x + 61 / 6, 
                y + 54 / 6, this.radarRadius);
        }
                                        // console.log(this.owner.weapon.bullet.frameWidthAndHeight);
    }

    privateUpdateRadar(){
        this.owner.game.entities.forEach( element => {
            if (element.boundingCircle && (element.boundingCircle !== this.radar)) {
                if (this.owner instanceof Enemy && element.boundingCircle.isCollided(this.radar) && element instanceof Player) {
                    this.vector = new Vector((element.boundingCircle.centerX - this.x) / 3, (element.boundingCircle.centerY - this.y) / 3);
                }

                if (this.owner instanceof Player && element.boundingCircle.isCollided(this.radar) && element instanceof Enemy) {
                    this.vector = new Vector((element.boundingCircle.centerX - this.x) / 3, (element.boundingCircle.centerY - this.y) / 3);
                }
            }
        })
    }

}