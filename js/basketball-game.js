class BasketballGame {
    constructor() {
        this.score = 0;
        this.hoopEl = document.getElementById('basketball-hoop');
        this.scoreDisplay = document.getElementById('score-display');
        this.scoreboardEl = document.getElementById('basketball-scoreboard');

        if (this.hoopEl && this.scoreDisplay) {
            this.init();
        }
    }

    init() {
        // Lancement de la surveillance de zone à chaque frame
        this.checkLoop();
    }

    checkLoop() {
        // On récupère toutes les bulles générées par le BubbleEngine via les variables globales
        const bubbles = (window.BubbleGlobals && window.BubbleGlobals.allBubbles) || [];

        if (bubbles.length > 0 && this.hoopEl) {
            // Obtenir la position physique exacte de l'arceau (Rim) à l'écran
            const hoopRect = this.hoopEl.getBoundingClientRect();

            // Paramétrage de la boîte de collision (la zone d'ouverture de l'arceau)
            const rimTop = hoopRect.top + 60; // Aligné avec le CSS .hoop-rim
            const rimLeft = hoopRect.left;
            const rimRight = hoopRect.right - 20;

            bubbles.forEach(b => {
                // Détecter si le centre de la bulle est aligné horizontalement avec l'arceau
                const isInsideX = (b.x > rimLeft && b.x < rimRight);

                // Détecter si la bulle franchit la ligne supérieure de l'arceau en tombant (vy > 0)
                const crossedRimDownwards = (b.y >= rimTop && (b.y - b.vy) < rimTop);

                if (isInsideX) {
                    if (crossedRimDownwards && !b.hasJustScored) {
                        // GOAL ! La bulle vient de passer proprement dans le panier
                        this.addPoint();
                        b.hasJustScored = true; // Verrouille la bulle pour cette action
                    }
                }

                // SÉCURITÉ ANTI-DOUBLON : Dès que la bulle s'éloigne ou sort du panier, on réactive son droit de marquer
                if (b.hasJustScored && (b.y < rimTop - b.radius || b.y > rimTop + 100 || !isInsideX)) {
                    b.hasJustScored = false;
                }
            });
        }

        requestAnimationFrame(() => this.checkLoop());
    }

    addPoint() {
        this.score += 2; // Un panier vaut 2 points !

        // Formatage de l'affichage (ex: 002, 014, 120...)
        this.scoreDisplay.innerText = String(this.score).padStart(3, '0');

        // Effet visuel rétro : Flash rouge sur le contour du panneau de score
        if (this.scoreboardEl) {
            this.scoreboardEl.classList.remove('flash-active');
            void this.scoreboardEl.offsetWidth; // Force le reset de l'animation CSS
            this.scoreboardEl.classList.add('flash-active');
        }
    }
}

// Lancement automatique du gestionnaire de jeu
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.BasketballGameInstance = new BasketballGame();
    }, 500); // Léger délai pour s'assurer que le moteur de bulle a fini son setup
});