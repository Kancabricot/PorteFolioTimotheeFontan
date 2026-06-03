class BaseBubble {
    constructor(htmlElement) {
        this.el = htmlElement;

        this.size = parseInt(this.el.dataset.size) || 150;
        this.originalSize = this.size;
        this.img = this.el.dataset.img || '';
        this.text = this.el.dataset.text || '';
        this.type = this.el.dataset.type || 'link';
        this.url = this.el.dataset.url || null;
        this.enableHover = this.el.dataset.hover !== 'false';

        this.radius = this.size / 2;
        this.mass = this.size;
        this.headerHeight = document.getElementById('main-header').offsetHeight || 90;

        this.hitWall = false;
        this.hitBubble = false;
        this.overlapMax = 0;

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
        if (this.img) this.el.style.backgroundImage = `url(${this.img})`;

        if (this.enableHover && this.text) {
            // 1. Création de l'écran noir de survol
            const info = document.createElement('div');
            info.className = 'bubble-info';

            // 2. Création et injection du titre
            const titleEl = document.createElement('div');
            titleEl.className = 'bubble-hover-title';
            titleEl.innerText = this.text;

            // Adaptabilité de la taille du titre si la bulle est petite
            if (this.size < 150) titleEl.style.fontSize = '0.8rem';
            info.appendChild(titleEl);

            // 3. Lecture et découpage des boîtes de couleur (tags)
            const rawTags = this.el.dataset.tags;
            if (rawTags) {
                const tagsContainer = document.createElement('div');
                tagsContainer.className = 'bubble-tags-container';

                // On sépare la chaîne par les virgules pour avoir chaque boîte
                const tagsArray = rawTags.split(',');

                tagsArray.forEach(tagData => {
                    // On sépare le mot de sa couleur par le symbole ":"
                    const parts = tagData.split(':');
                    const tagName = parts[0] ? parts[0].trim() : '';
                    const tagColor = parts[1] ? parts[1].trim() : '#333333'; // Gris par défaut si oublié

                    if (tagName !== '') {
                        // Création du badge HTML
                        const tagBadge = document.createElement('span');
                        tagBadge.className = 'bubble-tag';
                        tagBadge.innerText = tagName;
                        tagBadge.style.backgroundColor = tagColor; // Application de ta couleur !

                        // Sécurité : si la bulle est petite, on réduit aussi la taille des boîtes
                        if (this.size < 160) {
                            tagBadge.style.fontSize = '0.6rem';
                            tagBadge.style.padding = '2px 6px';
                        }

                        tagsContainer.appendChild(tagBadge);
                    }
                });

                info.appendChild(tagsContainer);
            }

            this.el.appendChild(info);
        }
    }

    bindEvents() {
        this.el.addEventListener('mousedown', (e) => {
            window.BubbleGlobals.draggedBubble = this;
            window.BubbleGlobals.dragStartX = e.clientX;
            window.BubbleGlobals.dragStartY = e.clientY;
            e.preventDefault();
        });
    }

    constrainBoundaries() {
        const currentPlayWidth = window.BubbleGlobals.currentPlayWidth || window.innerWidth;

        if (this.x - this.radius < 0) {
            this.x = this.radius; this.vx *= -0.4; this.hitWall = true;
        } else if (this.x + this.radius > currentPlayWidth) {
            this.x = currentPlayWidth - this.radius; this.vx *= -0.4; this.hitWall = true;
        }

        if (this.y - this.radius < this.headerHeight) {
            this.y = this.headerHeight + this.radius; this.vy *= -0.4; this.hitWall = true;
        } else if (this.y + this.radius > window.innerHeight) {
            this.y = window.innerHeight - this.radius; this.vy *= -0.4; this.hitWall = true;
        }
    }

    postUpdate() {}

    update() {
        if (window.BubbleGlobals.disablePhysics) return;

        if (this !== window.BubbleGlobals.draggedBubble) {
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

class BubbleEngine {
    constructor() {
        this.bubbles = [];
        this.header = document.getElementById('main-header');
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.bubble-project');
        elements.forEach(el => {
            if (typeof AttractionLawBubble !== 'undefined') {
                this.bubbles.push(new AttractionLawBubble(el));
            } else {
                this.bubbles.push(new BaseBubble(el));
            }
        });

        window.BubbleGlobals.allBubbles = this.bubbles;

        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        this.tick();
    }

    handleMouseMove(e) {
        const dragged = window.BubbleGlobals.draggedBubble;
        if (dragged) {
            dragged.x = e.clientX;
            dragged.y = e.clientY;
            dragged.vx = e.movementX * 0.3;
            dragged.vy = e.movementY * 0.3;
        }
    }

    handleMouseUp(e) {
        const dragged = window.BubbleGlobals.draggedBubble;
        if (dragged) {
            const dist = Math.hypot(e.clientX - window.BubbleGlobals.dragStartX, e.clientY - window.BubbleGlobals.dragStartY);

            if (dist < 5) { // Clic franc
                if (dragged.type === 'link' && dragged.url) {
                    window.location.href = dragged.url;
                } else if (dragged.type === 'panel') {
                    // Transmet l'ensemble du dataset (incluant le nouveau data-template)
                    window.BubbleGlobals.panelManager.open(dragged.el.dataset);
                }
            }
            window.BubbleGlobals.draggedBubble = null;
        }
    }

    resolveCollisions() {
        if (window.BubbleGlobals.disablePhysics) return;

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

                    if (b1 !== window.BubbleGlobals.draggedBubble) {
                        b1.x -= nx * overlap * (b2.mass / totalMass);
                        b1.y -= ny * overlap * (b2.mass / totalMass);
                        b1.vx -= nx * overlap * 0.02;
                        b1.vy -= ny * overlap * 0.02;
                    }
                    if (b2 !== window.BubbleGlobals.draggedBubble) {
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
        const headerHeight = this.header.offsetHeight || 90;
        const centerX = window.BubbleGlobals.currentPlayWidth / 2;
        const centerY = (window.innerHeight + headerHeight) / 2;

        this.bubbles.forEach(b => {
            b.hitWall = false;
            b.hitBubble = false;
            b.overlapMax = 0;
        });

        this.bubbles.forEach(b => {
            if (typeof b.applyBehaviors === 'function') {
                b.applyBehaviors(this.bubbles, centerX, centerY);
            }
        });

        this.resolveCollisions();
        this.bubbles.forEach(b => b.update());

        requestAnimationFrame(() => this.tick());
    }
}