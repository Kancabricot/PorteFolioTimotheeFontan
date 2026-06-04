const PROJECT_MEDIA_DATABASE = {
    "core-defender": {
        defaultLogo: "../assets/mainPage/image/profilePicture.png",

        slides: [
            {
                img: "../assets/mainPage/giff/CDMainPage.gif",
                logo: "../assets/mainPage/image/logo-arme-1.png",
                text: "<strong>Je veux d'l'amour, d'la joie, de la bonne humeur</strong> C'n'est pas votre argent qui f'ra mon bonheur"
            },
            {
                img: "../assets/mainPage/image/SpongeIndex.png",
                logo: "../assets/mainPage/image/logo-competence-2.png",
                text: "<strong>Moi, j'veux crever la main sur le cœur</strong> (Pa-pala, pa-pa-pala)"
            },
            {
                img: "../assets/mainPage/image/MaraIndex.png",
                text: "<strong>Allons ensemble, découvrir ma liberté</strong> Bienvenue dans ma réalité"
            }
        ]
    }
};

class SteamExplorer {
    constructor(projectId, containerEl) {
        this.project = PROJECT_MEDIA_DATABASE[projectId];
        this.container = containerEl;
        this.currentIdx = 0;

        if (!this.project) {
            this.container.innerHTML = `<p style="padding:20px; color:#fff;">Aucune donnée média trouvée pour le projet : ${projectId}</p>`;
            return;
        }

        this.render();
        this.bindEvents();
        this.setActiveSlide(0);
    }

    render() {
        this.container.innerHTML = `
            <div class="steam-explorer-container">
                <div class="explorer-media-column">
                    <div class="main-media-viewer">
                        <img id="steam-main-img" src="" alt="Media Principal">
                    </div>
                    
                    <div class="explorer-carousel-navbar">
                        <button class="carousel-nav-btn btn-left">❮</button>
                        <div class="carousel-thumbnails-track-wrapper">
                            <div class="carousel-thumbnails-track">
                                ${this.project.slides.map((slide, idx) => `
                                    <div class="thumbnail-item" data-idx="${idx}">
                                        <img src="${slide.img}" alt="Miniature ${idx}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <button class="carousel-nav-btn btn-right">❯</button>
                    </div>
                </div>

                <div class="explorer-info-column">
                    <div class="explorer-logo-wrapper">
                        <img id="steam-logo-img" src="" alt="Logo Dynamique" class="explorer-project-logo">
                    </div>
                    <div id="steam-description-text" class="explorer-description-box"></div>
                </div>
            </div>
        `;

        this.track = this.container.querySelector('.carousel-thumbnails-track');
        this.mainImg = this.container.querySelector('#steam-main-img');
        this.logoImg = this.container.querySelector('#steam-logo-img');
        this.descBox = this.container.querySelector('#steam-description-text');
        this.thumbnails = this.container.querySelectorAll('.thumbnail-item');
    }

    bindEvents() {
        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const idx = parseInt(thumb.dataset.idx);
                this.setActiveSlide(idx);
            });
        });

        this.container.querySelector('.btn-left').addEventListener('click', () => this.prev());
        this.container.querySelector('.btn-right').addEventListener('click', () => this.next());
    }

    setActiveSlide(idx) {
        if (idx < 0 || idx >= this.project.slides.length) return;
        this.currentIdx = idx;

        const slide = this.project.slides[idx];

        this.mainImg.src = slide.img;
        this.descBox.innerHTML = slide.text;

        const newLogoSrc = slide.logo || this.project.defaultLogo || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

        this.logoImg.style.opacity = '0';
        setTimeout(() => {
            this.logoImg.src = newLogoSrc;
            this.logoImg.style.opacity = '1';
        }, 150);

        this.thumbnails.forEach(t => t.classList.remove('active'));
        this.thumbnails[idx].classList.add('active');

        const thumbWidth = this.thumbnails[idx].offsetWidth + 10;
        this.track.style.transform = `translateX(-${this.currentIdx * thumbWidth}px)`;
    }

    next() {
        let nextIdx = this.currentIdx + 1;
        if (nextIdx >= this.project.slides.length) nextIdx = 0;
        this.setActiveSlide(nextIdx);
    }

    prev() {
        let prevIdx = this.currentIdx - 1;
        if (prevIdx < 0) prevIdx = this.project.slides.length - 1;
        this.setActiveSlide(prevIdx);
    }
}

window.SteamExplorer = SteamExplorer;