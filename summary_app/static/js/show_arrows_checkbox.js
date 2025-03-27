function toggleArrows() {
    const arrows = document.querySelectorAll('#term-list .move-up, #term-list .move-down');

    // Ensure containers exist
    if (!arrows.length) return;

    // Initialize each popup container
    arrows.forEach(arrow => {
        arrow.classList.toggle('show');
    });
};

// toggleArrows()
document.getElementById("show_arrows_checkbox").addEventListener('change', toggleArrows);