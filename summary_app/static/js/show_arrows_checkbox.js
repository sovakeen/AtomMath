function toggleArrows() {
    const arrows = document.querySelectorAll('#terms-list .move-up, #terms-list .move-down');

    // ensure containers exist
    if (!arrows.length) return;

    // initialize each popup container
    arrows.forEach(arrow => {
        arrow.classList.toggle('show');
    });
};

// toggleArrows()
document.getElementById("show-arrows-checkbox").addEventListener('change', toggleArrows);
