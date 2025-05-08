document.getElementById('json-file-input').addEventListener('change', function() {
    const fileInput = this;
    if (fileInput.files.length > 0) {
        document.getElementById('json-import-form').submit();
    }
});

function triggerFilePicker() {
    document.getElementById('json-file-input').click();
}
