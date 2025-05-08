// overriding some keys behaviour
function handleTextareaKeyPress(event) {
    // handle Tab key
    if (event.key === 'Tab') {
        event.preventDefault();
        
        // insert tab at cursor position
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        const value = event.target.value;
        
        event.target.value = value.substring(0, start) + '\t' + value.substring(end);
        
        // move cursor after tab
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
    
    // handle Enter key
    if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        
        // insert newline at cursor position
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        const value = event.target.value;
        
        event.target.value = value.substring(0, start) + '\n' + value.substring(end);
        
        // move cursor to new line
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

// apply the key handling to specific textareas
document.addEventListener('DOMContentLoaded', function() {
    // add the class 'custom-keys' to any textarea you want to have this behavior
    const textareas = document.querySelectorAll('textarea.custom-keys');
    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', handleTextareaKeyPress);
    });
});
