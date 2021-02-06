class BoundingCircle {
    constructor(centerX, centerY, radius) {
        Object.assign(this, {centerX, centerY, radius});
    }

    setLocation(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
    }
    
    isCollided(otherBoundingCircle) {
        let dx = this.centerX - otherBoundingCircle.centerX;
        let dy = this.centerY - otherBoundingCircle.centerY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.radius + otherBoundingCircle.radius) {
            return true;
        }
        return false;
    }
}