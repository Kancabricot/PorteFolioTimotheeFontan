// ==========================================
// CONFIGURATION GLOBALE DU MOTEUR
// ==========================================
let attractionForce = 0.08;

// Globales pour le Drag & Drop
let draggedBubble = null;
let dragStartX = 0, dragStartY = 0;

// ==========================================
// 1. CLASSE PARENTE : BaseBubble
// ==========================================
class BaseBubble {
    constructor(htmlElement) {
        this.el = htmlElement;

        // Récupération des données HTML
        this.size = parseInt(this.el.dataset.size) || 150;
        this.originalSize = this.size;
        this.img = this.el.dataset.img || '';
        this.text = this.el.dataset.text || '';
        this.url = this.el.dataset.url || null;
        this.enableHover = this.el.dataset.hover !== 'false';

        this.radius = this.size / 2;
        this.mass = this.size;

        this.headerHeight = document.getElementById('main-header').offsetHeight;

        // Capteurs de pression
        this.hitWall = false;
        this.hitBubble = false;
        this.overlapMax = 0;

        // Positionnement initial
        this.x = window.innerWidth / 2 + (Math.random() * 400 - 200);
        this.y = (window.innerHeight + this.headerHeight) / 2 + (Math.random() * 400 - 200);
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;

        this.buildDOM();
        this.bindEvents();
    }

    buildDOM() {
        this.el.classList.add('bubble');
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;
        this.el.style.backgroundImage = `url(${this.img})`;

        if (this.enableHover && this.text) {
            const info = document.createElement('div');
            info.className = 'bubble-info';
            info.innerText = this.text;
            if (this.size < 140) info.style.fontSize = '0.75rem';
            this.el.appendChild(info);
        }
    }

    bindEvents() {
        this.el.addEventListener('mousedown', (e) => {
            draggedBubble = this;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            e.preventDefault();
        });
    }

    constrainBoundaries() {
        if (this.x - this.radius < 0) {
            this.x = this.radius; this.vx *= -0.4; this.hitWall = true;
        } else if (this.x + this.radius > window.innerWidth) {
            this.x = window.innerWidth - this.radius; this.vx *= -0.4; this.hitWall = true;
        }

        if (this.y - this.radius < this.headerHeight) {
            this.y = this.headerHeight + this.radius; this.vy *= -0.4; this.hitWall = true;
        } else if (this.y + this.radius > window.innerHeight) {
            this.y = window.innerHeight - this.radius; this.vy *= -0.4; this.hitWall = true;
        }
    }

    postUpdate() {}

    update() {
        if (this !== draggedBubble) {
            this.vx *= 0.93;
            this.vy *= 0.93;
            this.x += this.vx;
            this.y += this.vy;
        }

        this.constrainBoundaries();
        this.postUpdate();

        this.el.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px)`;
    }
}

// ==========================================
// 2. CLASSE ENFANT : Attraction + Amortisseur Anti-Jitter
// ==========================================
class AttractionLawBubble extends BaseBubble {
    constructor(htmlElement) {
        super(htmlElement);
    }

    applyBehaviors(allBubbles, centerX, centerY) {
        if (this === draggedBubble) return;

        this.vx += (centerX - this.x) * 0.00005;
        this.vy += (centerY - this.y) * 0.00005;

        allBubbles.forEach(other => {
            if (other === this) return;

            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let dist = Math.hypot(dx, dy);
            let minDist = this.radius + other.radius;

            if (dist > (minDist + 6)) {
                let pullForce = (attractionForce * other.mass) / dist;
                pullForce = Math.min(pullForce, 0.15);

                this.vx += (dx / dist) * pullForce;
                this.vy += (dy / dist) * pullForce;
            }
        });
    }

    // --- LOGIQUE MODIFIÉE POUR LIQUIDER LE JITTER ---
    postUpdate() {
        const growthSpeed = 4.0;   // Vitesse d'agrandissement boostée (anciennement 1.0)
        const shrinkSpeed = 3.0;   // Vitesse de rétrécissement sous pression
        const crushThreshold = 12; // Seuil anti-jitter (doit être supérieur à growthSpeed !)

        // La bulle ne rétrécit QUE si elle est coincée contre un mur OU si l'écrasement dépasse le gros seuil
        let isSqueezed = (this.hitWall && this.hitBubble) || (this.overlapMax > crushThreshold);

        if (isSqueezed) {
            this.size = Math.max(45, this.size - shrinkSpeed);
        }
        // Si elle a la place et n'est pas écrasée au-delà du seuil, elle grandit TRÈS vite
        else if (this.size < this.originalSize) {
            this.size = Math.min(this.originalSize, this.size + growthSpeed);
        }

        // Recalcul des constantes physiques de l'instance
        this.radius = this.size / 2;
        this.mass = this.size;

        // Rendu HTML
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;

        // Gestion propre du texte interne
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

// ==========================================
// 3. LE MOTEUR DE JEU (Engine)
// ==========================================
class BubbleEngine {
    constructor() {
        this.bubbles = [];
        this.header = document.getElementById('main-header');
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.bubble-project');
        elements.forEach(el => {
            this.bubbles.push(new AttractionLawBubble(el));
        });

        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        this.tick();
    }

    handleMouseMove(e) {
        if (draggedBubble) {
            draggedBubble.x = e.clientX;
            draggedBubble.y = e.clientY;
            draggedBubble.vx = e.movementX * 0.3;
            draggedBubble.vy = e.movementY * 0.3;
        }
    }

    handleMouseUp(e) {
        if (draggedBubble) {
            const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
            if (dist < 5 && draggedBubble.url) {
                window.location.href = draggedBubble.url;
            }
            draggedBubble = null;
        }
    }

    resolveCollisions() {
        for (let i = 0; i < this.bubbles.length; i++) {
            for (let j = i + 1; j < this.bubbles.length; j++) {
                let b1 = this.bubbles[i];
                let b2 = this.bubbles[j];

                let dx = b2.x - b1.x;
                let dy = b2.y - b1.y;
                let dist = Math.hypot(dx, dy);
                let minDist = b1.radius + b2.radius;

                if (dist < minDist && dist > 0) {
                    let overlap = minDist - dist;
                    let nx = dx / dist;
                    let ny = dy / dist;

                    b1.hitBubble = true;
                    b2.hitBubble = true;
                    b1.overlapMax = Math.max(b1.overlapMax, overlap);
                    b2.overlapMax = Math.max(b2.overlapMax, overlap);

                    let totalMass = b1.mass + b2.mass;

                    if (b1 !== draggedBubble) {
                        b1.x -= nx * overlap * (b2.mass / totalMass);
                        b1.y -= ny * overlap * (b2.mass / totalMass);
                        b1.vx -= nx * overlap * 0.02;
                        b1.vy -= ny * overlap * 0.02;
                    }
                    if (b2 !== draggedBubble) {
                        b2.x += nx * overlap * (b1.mass / totalMass);
                        b2.y += ny * overlap * (b1.mass / totalMass);
                        b2.vx += nx * overlap * 0.02;
                        b2.vy += ny * overlap * 0.02;
                    }
                }
            }
        }
    }

    tick() {
        const headerHeight = this.header.offsetHeight;
        const centerX = window.innerWidth / 2;
        const centerY = (window.innerHeight + headerHeight) / 2;

        this.bubbles.forEach(b => {
            b.hitWall = false;
            b.hitBubble = false;
            b.overlapMax = 0;
        });

        this.bubbles.forEach(b => {
            if(typeof b.applyBehaviors === 'function') {
                b.applyBehaviors(this.bubbles, centerX, centerY);
            }
        });

        this.resolveCollisions();
        this.bubbles.forEach(b => b.update());

        requestAnimationFrame(() => this.tick());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new BubbleEngine();
});

// ==========================================
// GESTION DE LA POP-UP D'ONBOARDING
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('help-popup');
    const closeBtn = document.querySelector('.close-popup-btn');
    const confirmBtn = document.querySelector('.confirm-popup-btn');

    // Étape 1 : Vérifier si l'utilisateur a déjà fermé la pop-up par le passé
    const isPopupDismissed = localStorage.getItem('hideBubbleOnboarding');

    if (!isPopupDismissed && popup) {
        // Étape 2 : Petit délai d'apparition (1.5s) pour laisser la page charger proprement
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);
    }

    // Fonction pour fermer et enregistrer le choix
    function dismissPopup() {
        popup.classList.remove('active');
        // On stocke l'info dans le navigateur de l'utilisateur
        localStorage.setItem('hideBubbleOnboarding', 'true');
    }

    // Événements de fermeture
    if (confirmBtn) confirmBtn.addEventListener('click', dismissPopup);
    if (closeBtn) closeBtn.addEventListener('click', dismissPopup);
});