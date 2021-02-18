class BoundingCircle {
    constructor(centerX, centerY, radius) {
        Object.assign(this, {centerX, centerY, radius});
    }

    /**
     * Use for player only. Might update the implementation later.
     * @param {number} centerX 
     * @param {number} centerY 
     */
    setLocation(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
    }

    /**
     * Use for enemy only.
     * @param {number} velX 
     * @param {number} velY 
     */
    setLocationWithVector(velX, velY) {
        this.centerX += velX;
        this.centerY += velY;
    }
    
    isCollided(otherBoundingCircle) {
        // console.log("x", this.centerX, otherBoundingCircle.centerX);
        // console.log("y", this.centerY, otherBoundingCircle.centerY);
        let dx = this.centerX - otherBoundingCircle.centerX;
        let dy = this.centerY - otherBoundingCircle.centerY;
        // console.log("dx", dx);
        // console.log("dy", dy);

        let distance = Math.sqrt(dx * dx + dy * dy);
        // console.log("distance", distance);

        if (distance < this.radius + otherBoundingCircle.radius) {
            return true;
        }
        return false;
    }
}