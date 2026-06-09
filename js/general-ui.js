window.addEventListener('DOMContentLoaded', () => {
    initOnboardingPopup();
    initNavigationOverlays();
});

function initOnboardingPopup() {
    const popup = document.getElementById('help-popup');
    const closeBtn = document.querySelector('.close-popup-btn');
    const confirmBtn = document.querySelector('.confirm-popup-btn');

    const isPopupDismissed = localStorage.getItem('hideBubbleOnboarding');

    if (!isPopupDismissed && popup) {
        setTimeout(() => {
            popup.classList.add('active');
        }, 1500);
    }

    function dismissPopup() {
        if (popup) {
            popup.classList.remove('active');
            localStorage.setItem('hideBubbleOnboarding', 'true');
        }
    }

    if (confirmBtn) confirmBtn.addEventListener('click', dismissPopup);
    if (closeBtn) closeBtn.addEventListener('click', dismissPopup);
}

function initNavigationOverlays() {
    const navLinks = document.querySelectorAll('.nav-link');
    const overlays = document.querySelectorAll('.ui-overlay');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const href = link.getAttribute('href');
            if (!href) return;

            const targetId = href.replace('.html', '-overlay');
            const targetOverlay = document.getElementById(targetId);

            if (targetOverlay) {
                targetOverlay.classList.add('active');
            }
        });
    });

    overlays.forEach(overlay => {
        const closeBtn = overlay.querySelector('.close-overlay-btn');
        const closeOverlay = () => overlay.classList.remove('active');

        if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeOverlay();
            }
        });
    });
}