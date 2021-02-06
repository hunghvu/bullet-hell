class BoundingCircle {
    constructor(centerX, centerY, radius) {
        Object.assign(this, {centerX, centerY, radius});
    }

    setLocation(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
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