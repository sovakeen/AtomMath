function toggleIDs() {
    const ids = document.querySelectorAll('.term-id');

    // ensure containers exist
    if (!ids.length) return;

    // initialize each popup container
    ids.forEach(id => {
        id.classList.toggle('show');
    });
};

// initial toggle
// toggleIDs()
document.getElementById("show-ids-checkbox").addEventListener('change', toggleIDs);
