class BasketballGame {
    constructor() {
        this.score = 0;
        this.hoopEl = document.getElementById('basketball-hoop');
        this.scoreDisplay = document.getElementById('score-display');
        this.scoreboardEl = document.getElementById('basketball-scoreboard');

        if (this.hoopEl && this.scoreDisplay) {
            this.init();
        } else {
            console.warn("BasketballGame: Éléments requis manquants dans le DOM.");
        }
    }

    init() {
        this.checkLoop();
    }

    checkLoop() {
        const bubbles = (window.BubbleGlobals && window.BubbleGlobals.allBubbles) || [];

        if (bubbles.length > 0 && this.hoopEl) {
            const hoopRect = this.hoopEl.getBoundingClientRect();

            const rimTop = hoopRect.top + (hoopRect.height * 0.5);
            const rimRight = hoopRect.right - (hoopRect.width * 0.14);
            const rimLeft = rimRight - (hoopRect.width * 0.6);

            bubbles.forEach(b => {
                const isInsideX = (b.x > rimLeft && b.x < rimRight);
                const crossedRimDownwards = (b.y >= rimTop && (b.y - (b.vy || 0)) < rimTop);

                if (isInsideX) {
                    if (crossedRimDownwards && !b.hasJustScored) {
                        this.addPoint();
                        b.hasJustScored = true;
                    }
                }

                if (b.hasJustScored && (b.y < rimTop - (b.radius || 20) || b.y > rimTop + 100 || !isInsideX)) {
                    b.hasJustScored = false;
                }
            });
        }

        requestAnimationFrame(() => this.checkLoop());
    }

    addPoint() {
        this.score += 2;
        this.scoreDisplay.innerText = String(this.score).padStart(3, '0');

        if (this.scoreboardEl) {
            this.scoreboardEl.classList.remove('flash-active');
            void this.scoreboardEl.offsetWidth;
            this.scoreboardEl.classList.add('flash-active');
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.BasketballGameInstance = new BasketballGame();
    }, 500);
});