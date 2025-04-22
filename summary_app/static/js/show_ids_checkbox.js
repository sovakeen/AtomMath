function toggleIDs() {
    const ids = document.querySelectorAll('.id');

    // Ensure containers exist
    if (!ids.length) return;

    // Initialize each popup container
    ids.forEach(id => {
        id.classList.toggle('show');
    });
};

// Initial toggle
// toggleIDs()
document.getElementById("show_ids_checkbox").addEventListener('change', toggleIDs);