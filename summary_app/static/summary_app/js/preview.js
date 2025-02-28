// Function to render math in preview
function renderPreview() {
    const definitionText = document.getElementById("definition field").value;
    const previewSpan = document.querySelector("#preview span");
    previewSpan.innerHTML = definitionText.replace(/\n/g, '<br>');
    renderMathInElement(document.getElementById("preview"), {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false
    });
}

// Function to toggle preview visibility
function togglePreview() {
    const isChecked = document.getElementById("show_preview").checked;
    document.body.classList.toggle("show-preview", isChecked);
}

// Add event listeners
document.getElementById("definition field").addEventListener('input', renderPreview);
document.getElementById("show_preview").addEventListener('change', togglePreview);

// Initial setup
renderPreview();
togglePreview();