function triggerFilePicker() {
    // Trigger the hidden file input's click event
    const fileInput = document.getElementById('json-file-input');
    fileInput.click();

    // Auto-submit the form when a file is selected
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            document.getElementById('import-form').submit();
        }
    });
}