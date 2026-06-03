
const ATTRACTION_FORCE_MUTUAL = 0.08;

class AttractionLawBubble extends BaseBubble {
    constructor(htmlElement) {
        super(htmlElement);
    }

    applyBehaviors(allBubbles, centerX, centerY) {

        if (window.BubbleGlobals && this === window.BubbleGlobals.draggedBubble) return;

        this.vx += (centerX - this.x) * 0.00005;
        this.vy += (centerY - this.y) * 0.00005;

        allBubbles.forEach(other => {
            if (other === this) return;

            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let dist = Math.hypot(dx, dy);
            let minDist = this.radius + other.radius;

            if (dist > (minDist + 6)) {
                let pullForce = (ATTRACTION_FORCE_MUTUAL * other.mass) / dist;
                pullForce = Math.min(pullForce, 0.15);

                this.vx += (dx / dist) * pullForce;
                this.vy += (dy / dist) * pullForce;
            }
        });
    }

    postUpdate() {
        const growthSpeed = 4.0;
        const shrinkSpeed = 3.0;
        const crushThreshold = 12;

        let isSqueezed = (this.hitWall && this.hitBubble) || (this.overlapMax > crushThreshold);

        if (isSqueezed) {
            this.size = Math.max(45, this.size - shrinkSpeed);
        }
        else if (this.size < this.originalSize) {
            this.size = Math.min(this.originalSize, this.size + growthSpeed);
        }

        this.radius = this.size / 2;
        this.mass = this.size;

        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;

        const info = this.el.querySelector('.bubble-info');
        if (info) {
            if (this.size < 85) {
                info.style.opacity = '0';
            } else {
                info.style.opacity = '';
                info.style.fontSize = this.size < 140 ? '0.75rem' : '0.95rem';
            }
        }
    }
}

if (typeof window !== 'undefined') {
    window.AttractionLawBubble = AttractionLawBubble;
}