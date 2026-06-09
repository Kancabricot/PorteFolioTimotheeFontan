const GRAVITY_FORCE = 0.3;
const BOUNCE_FACTOR = 0.7;
const AIR_RESISTANCE = 0.98;

class GravityBubble extends BaseBubble {
    constructor(htmlElement) {
        super(htmlElement);
    }

    applyBehaviors() {
        if (window.BubbleGlobals && this === window.BubbleGlobals.draggedBubble) return;

        this.vy += GRAVITY_FORCE;
    }

    constrainBoundaries() {
        const currentPlayWidth = window.BubbleGlobals.currentPlayWidth || window.innerWidth;
        const REST_THRESHOLD = 0.5;

        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -BOUNCE_FACTOR;
            this.hitWall = true;
        } else if (this.x + this.radius > currentPlayWidth) {
            this.x = currentPlayWidth - this.radius;
            this.vx *= -BOUNCE_FACTOR;
            this.hitWall = true;
        }

        if (this.y - this.radius < this.headerHeight) {
            this.y = this.headerHeight + this.radius;
            this.vy *= -BOUNCE_FACTOR;
            this.hitWall = true;
        } else if (this.y + this.radius > window.innerHeight) {
            this.y = window.innerHeight - this.radius;

            if (Math.abs(this.vy) < REST_THRESHOLD) {
                this.vy = 0;
            } else {
                this.vy *= -BOUNCE_FACTOR;
            }
            this.hitWall = true;
        }
    }

    update() {
        if (window.BubbleGlobals.disablePhysics) return;

        if (this !== window.BubbleGlobals.draggedBubble) {
            this.vx *= AIR_RESISTANCE;
            this.vy *= AIR_RESISTANCE;
            this.x += this.vx;
            this.y += this.vy;
        }

        this.constrainBoundaries();
        this.postUpdate();

        this.el.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px)`;
    }
}

if (typeof window !== 'undefined') {
    window.GravityBubble = GravityBubble;
}