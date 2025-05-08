// function to render math in preview
function renderPreview() {
    const definitionText = document.getElementById("definition-field").value;
    const previewSpan = document.querySelector("#preview-div span");
    previewSpan.innerHTML = definitionText.replace(/\n/g, '<br>');
    renderMathInElement(document.getElementById("preview-div"), {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false}
        ],
        throwOnError: false
    });
}

// function to toggle preview visibility
function togglePreview() {
    const isChecked = document.getElementById("preview-checkbox").checked;
    document.getElementById("content").classList.toggle("show-preview", isChecked);
}

// add event listeners
document.getElementById("definition-field").addEventListener('keyup', renderPreview);
document.getElementById("preview-checkbox").addEventListener('change', togglePreview);

// initial setup
renderPreview();
togglePreview();
