// ==========================================
// SCRIPTS ET INTERFACES GÉNÉRALES (UI)
// ==========================================

window.addEventListener('DOMContentLoaded', () => {
    initOnboardingPopup();
    initNavigationOverlays(); // <-- Activé ici !
});

/**
 * Gestion de la Pop-up d'Onboarding (Style Glassmorphism)
 * Avec mémoire de fermeture via localStorage
 */
function initOnboardingPopup() {
    const popup = document.getElementById('help-popup');
    const closeBtn = document.querySelector('.close-popup-btn');
    const confirmBtn = document.querySelector('.confirm-popup-btn');

    // 1. Vérifier si l'utilisateur a déjà fermé la pop-up par le passé
    const isPopupDismissed = localStorage.getItem('hideBubbleOnboarding');

    if (!isPopupDismissed && popup) {
        // 2. Petit délai d'apparition (1.5s) pour laisser la page charger proprement
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);
    }

    // Fonction pour fermer et enregistrer le choix
    function dismissPopup() {
        if (popup) {
            popup.classList.remove('active');
            // On stocke l'info dans le navigateur de l'utilisateur
            localStorage.setItem('hideBubbleOnboarding', 'true');
        }
    }

    // Événements de fermeture
    if (confirmBtn) confirmBtn.addEventListener('click', dismissPopup);
    if (closeBtn) closeBtn.addEventListener('click', dismissPopup);
}

/**
 * Gestion des Overlays fluides About Me & Contact
 * Ouvre les panneaux en plein écran sans recharger la page
 */
function initNavigationOverlays() {
    const navLinks = document.querySelectorAll('.nav-link');
    const overlays = document.querySelectorAll('.ui-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Bloque la redirection brute vers une autre page

            // Récupère l'attribut (ex: "about.html") et le convertit en ID (ex: "about-overlay")
            const href = link.getAttribute('href');
            if (!href) return;

            const targetId = href.replace('.html', '-overlay');
            const targetOverlay = document.getElementById(targetId);

            if (targetOverlay) {
                targetOverlay.classList.add('active');
            }
        });
    });

    // Configuration de la fermeture des volets
    overlays.forEach(overlay => {
        const closeBtn = overlay.querySelector('.close-overlay-btn');
        const closeOverlay = () => overlay.classList.remove('active');

        // Fermeture via le bouton d'angle (X)
        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

        // Fermeture si on clique n'importe où sur le flou en arrière-plan
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
    });
}