/* ==========================================
   CONFIGURATION DE LA GRAVITÉ ET DES REBONDS
   ========================================== */
const GRAVITY_FORCE = 0.3;      // Force de la gravité (plus élevé = tombe plus vite)
const BOUNCE_FACTOR = 0.7;      // Force du rebond (0.0 = pas de rebond, 1.0 = rebond infini)
const AIR_RESISTANCE = 0.98;    // Friction de l'air (proche de 1.0 = glisse plus longtemps)

class GravityBubble extends BaseBubble {
    constructor(htmlElement) {
        super(htmlElement);
    }

    // 1. Application des forces (Gravité)
    applyBehaviors(allBubbles, centerX, centerY) {
        // Si on est en train de glisser/drag la bulle, on n'applique pas la gravité
        if (window.BubbleGlobals && this === window.BubbleGlobals.draggedBubble) return;

        // Application de la force gravitationnelle vers le bas
        this.vy += GRAVITY_FORCE;
    }

    // 2. Gestion personnalisée des rebonds sur les murs
    constrainBoundaries() {
        const currentPlayWidth = window.BubbleGlobals.currentPlayWidth || window.innerWidth;
        const REST_THRESHOLD = 0.5; // Évite les micro-vibrations infinies au sol

        // Rebond Mur Gauche / Droit
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -BOUNCE_FACTOR;
            this.hitWall = true;
        } else if (this.x + this.radius > currentPlayWidth) {
            this.x = currentPlayWidth - this.radius;
            this.vx *= -BOUNCE_FACTOR;
            this.hitWall = true;
        }

        // Rebond Plafond (Header)
        if (this.y - this.radius < this.headerHeight) {
            this.y = this.headerHeight + this.radius;
            this.vy *= -BOUNCE_FACTOR;
            this.hitWall = true;
        }
        // Rebond Sol (Bas de l'écran)
        else if (this.y + this.radius > window.innerHeight) {
            this.y = window.innerHeight - this.radius;

            // Stabilisation : si le rebond devient trop faible, on stoppe la bulle au sol
            if (Math.abs(this.vy) < REST_THRESHOLD) {
                this.vy = 0;
            } else {
                this.vy *= -BOUNCE_FACTOR; // Rebondit vers le haut !
            }
            this.hitWall = true;
        }
    }

    // 3. Redéfinition de l'update pour contrôler la friction de l'air
    update() {
        if (window.BubbleGlobals.disablePhysics) return;

        if (this !== window.BubbleGlobals.draggedBubble) {
            // Utilisation de notre résistance de l'air personnalisée
            this.vx *= AIR_RESISTANCE;
            this.vy *= AIR_RESISTANCE;
            this.x += this.vx;
            this.y += this.vy;
        }

        this.constrainBoundaries();
        this.postUpdate();

        // Application visuelle du mouvement
        this.el.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px)`;
    }
}

// Rendre la classe disponible globalement
if (typeof window !== 'undefined') {
    window.GravityBubble = GravityBubble;
}