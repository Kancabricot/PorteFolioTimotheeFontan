window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        e.preventDefault(); // empêche le scroll
    }
}, { passive: false });