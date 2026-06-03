// Configuration globale de la puissance de l'aimant inter-bulles
const ATTRACTION_FORCE_MUTUAL = 0.08;

class AttractionLawBubble extends BaseBubble {
    constructor(htmlElement) {
        super(htmlElement);
    }

    applyBehaviors(allBubbles, centerX, centerY) {
        // Sécurité si l'utilisateur maintient la bulle avec son curseur
        if (window.BubbleGlobals && this === window.BubbleGlobals.draggedBubble) return;

        // 1. Rappel de gravité centrale invisible de ton script (0.00005)
        this.vx += (centerX - this.x) * 0.00005;
        this.vy += (centerY - this.y) * 0.00005;

        // 2. Attraction mutuelle inter-bulles exacte de ton script
        allBubbles.forEach(other => {
            if (other === this) return;

            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let dist = Math.hypot(dx, dy);
            let minDist = this.radius + other.radius;

            // Seuil d'activation précis à minDist + 6px
            if (dist > (minDist + 6)) {
                let pullForce = (ATTRACTION_FORCE_MUTUAL * other.mass) / dist;
                pullForce = Math.min(pullForce, 0.15); // Limiteur de sécurité à 0.15

                this.vx += (dx / dist) * pullForce;
                this.vy += (dy / dist) * pullForce;
            }
        });
    }

    // === TON SYSTÈME ANTI-JITTER ULTRA RÉACTIF COMPLET ===
    postUpdate() {
        const growthSpeed = 4.0;   // Vitesse de retour à la taille initiale
        const shrinkSpeed = 3.0;   // Vitesse d'écrasement sous forte pression
        const crushThreshold = 12; // Seuil d'activation de l'écrasement

        // Détermination stricte de la condition d'écrasement (Squeezed)
        let isSqueezed = (this.hitWall && this.hitBubble) || (this.overlapMax > crushThreshold);

        if (isSqueezed) {
            // ÉTAT 1 : Écrasement mécanique actif
            this.size = Math.max(45, this.size - shrinkSpeed);
        }
        else if (this.size < this.originalSize) {
            // ÉTAT 3 : Libération de pression, la bulle regrandit très rapidement
            this.size = Math.min(this.originalSize, this.size + growthSpeed);
        }
        // ÉTAT 2 : Si la bulle est stable, la taille est parfaitement verrouillée

        // Recalcul immédiat des rayons et masses pour l'affichage de la frame suivante
        this.radius = this.size / 2;
        this.mass = this.size;

        // Rendu géométrique de la bulle
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;

        // Gestion adaptative de l'affichage du texte au coeur de la bulle
        const info = this.el.querySelector('.bubble-info');
        if (info) {
            if (this.size < 85) {
                info.style.opacity = '0'; // Disparition si la bulle est trop écrasée
            } else {
                info.style.opacity = '';
                info.style.fontSize = this.size < 140 ? '0.75rem' : '0.95rem';
            }
        }
    }
}

// Sécurité d'enregistrement de la classe
if (typeof window !== 'undefined') {
    window.AttractionLawBubble = AttractionLawBubble;
}