// Function to render math in preview
function renderPreview() {
    const definitionText = document.getElementById("definition_field").value;
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
    const isChecked = document.getElementById("preview_checkbox").checked;
    document.getElementById("content").classList.toggle("show_preview", isChecked);
}

// Add event listeners
document.getElementById("definition_field").addEventListener('keyup', renderPreview);
document.getElementById("preview_checkbox").addEventListener('change', togglePreview);

// Initial setup
renderPreview();
togglePreview();