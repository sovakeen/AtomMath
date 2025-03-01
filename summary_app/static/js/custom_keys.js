// Overriding some keys behaviour
function handleTextareaKeyPress(event) {
    // Handle Tab key
    if (event.key === 'Tab') {
        event.preventDefault();
        
        // Insert tab at cursor position
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        const value = event.target.value;
        
        event.target.value = value.substring(0, start) + '\t' + value.substring(end);
        
        // Move cursor after tab
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
    
    // Handle Enter key
    if (event.key === 'Enter' && event.shiftKey) {
        event.preventDefault();
        
        // Insert newline at cursor position
        const start = event.target.selectionStart;
        const end = event.target.selectionEnd;
        const value = event.target.value;
        
        event.target.value = value.substring(0, start) + '\n' + value.substring(end);
        
        // Move cursor to new line
        event.target.selectionStart = event.target.selectionEnd = start + 1;
    }
}

// Apply the key handling to specific textareas
document.addEventListener('DOMContentLoaded', function() {
    // Add the class 'custom-keys' to any textarea you want to have this behavior
    const textareas = document.querySelectorAll('textarea.custom_keys');
    textareas.forEach(textarea => {
        textarea.addEventListener('keydown', handleTextareaKeyPress);
    });
});