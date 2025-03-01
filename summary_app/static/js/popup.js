document.addEventListener('DOMContentLoaded', () => {
    const clickableElement = document.querySelector('.clickable_element');
    const popupMenu = document.getElementById('popup_menu');

    // Ensure elements exist
    if (!clickableElement || !popupMenu) return;

    // Toggle popup visibility
    clickableElement.addEventListener('click', (event) => {
        event.stopPropagation();
        popupMenu.classList.toggle('show');
    });

    // Close popup when clicking outside
    document.addEventListener('click', (event) => {
        if (!popupMenu.contains(event.target) && 
            event.target !== clickableElement) {
            popupMenu.classList.remove('show');
        }
    });
});