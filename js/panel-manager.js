window.BubbleGlobals = {
    draggedBubble: null,
    dragStartX: 0,
    dragStartY: 0,
    currentPlayWidth: window.innerWidth,
    disablePhysics: false,
    allBubbles: []
};

class PanelManager {
    constructor() {
        this.panel = document.getElementById('project-panel');
        this.btnClose = document.getElementById('panel-btn-close');
        this.btnMax = document.getElementById('panel-btn-maximize');
        this.isMaximized = false;
        this.initEvents();
    }

    initEvents() {
        if (!this.panel) return;
        this.btnClose.addEventListener('click', () => this.close());
        this.btnMax.addEventListener('click', () => this.toggleMaximize());

        window.addEventListener('resize', () => {
            if (this.panel.classList.contains('open-half')) {
                window.BubbleGlobals.currentPlayWidth = window.innerWidth * 0.5;
            } else if (!this.isMaximized) {
                window.BubbleGlobals.currentPlayWidth = window.innerWidth;
            }
        });
    }

    open(data) {
        const panelBody = this.panel.querySelector('.panel-body');
        if (!panelBody) return;

        panelBody.innerHTML = '';

        if (data.template) {
            const templateElement = document.getElementById(data.template);
            if (templateElement) {
                const clone = templateElement.content.cloneNode(true);
                panelBody.appendChild(clone);
            } else {
                panelBody.innerHTML = `<h1 style="color:red; font-size:18px;">Erreur : Le template "${data.template}" est introuvable dans le HTML.</h1>`;
            }
        } else {
            panelBody.innerHTML = `
                <h1 id="panel-main-title">${data.title || 'Projet'}</h1>
                <div id="panel-media-container">
                    ${data.media ? `<img src="${data.media}" alt="Illustration">` : ''}
                </div>
                <p id="panel-description">${data.text || ''}</p>
            `;
        }

        const steamPlaceholder = panelBody.querySelector('[data-steam-project]');
        if (steamPlaceholder && typeof SteamExplorer !== 'undefined') {
            const projectId = steamPlaceholder.getAttribute('data-steam-project');
            new SteamExplorer(projectId, steamPlaceholder);
        }

        this.panel.className = "side-panel open-half";
        this.isMaximized = false;
        this.btnMax.innerText = "🗖";

        window.BubbleGlobals.currentPlayWidth = window.innerWidth * 0.5;
        window.BubbleGlobals.disablePhysics = false;
    }

    close() {
        this.panel.className = "side-panel";
        window.BubbleGlobals.currentPlayWidth = window.innerWidth;
        window.BubbleGlobals.disablePhysics = false;
    }

    toggleMaximize() {
        if (!this.isMaximized) {
            this.panel.className = "side-panel open-full";
            this.btnMax.innerText = "🗗";
            this.isMaximized = true;
            window.BubbleGlobals.disablePhysics = true;
        } else {
            this.panel.className = "side-panel open-half";
            this.btnMax.innerText = "🗖";
            this.isMaximized = false;
            window.BubbleGlobals.currentPlayWidth = window.innerWidth * 0.5;
            window.BubbleGlobals.disablePhysics = false;
        }
    }
}

window.BubbleGlobals.panelManager = new PanelManager();