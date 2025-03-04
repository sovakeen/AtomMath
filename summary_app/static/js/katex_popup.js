document.addEventListener('DOMContentLoaded', () => {
    const clickableElement = document.querySelector('.clickable_element');
    const popupMenu = document.getElementById('katex_popup');
    const popupList = popupMenu.querySelector('ul');

    // Ensure elements exist
    if (!clickableElement || !popupMenu || !popupList) return;

    // Function to load and populate katex constructions
    async function loadKatexConstructions() {
        try {
            // Fetch the katex constructions file
            const response = await fetch('/static/katex/katex_constructions.txt');
            const text = await response.text();
            
            // Clear existing list items
            popupList.innerHTML = '';
            
            // Process the file content
            const lines = text.split('\n')
                .filter(line => line.trim() && !line.startsWith('#'));
            
            // Create list items for each construction
            lines.forEach(elem => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="katex-render">$${elem}$</span>
                    <span class="katex-text">${elem}</span>
                `;
                li.onclick = () => {
                    navigator.clipboard.writeText(elem);
                };
                popupList.appendChild(li);
            });

            // Render math after items are added
            if (typeof renderMathInElement !== 'undefined') {
                renderMathInElement(popupList, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
            }
        } catch (error) {
            console.error('Error loading katex constructions:', error);
        }
    }

    // Toggle popup visibility
    clickableElement.addEventListener('click', (event) => {
        event.stopPropagation();
        
        // Load constructions if popup is being opened
        if (!popupMenu.classList.contains('show')) {
            loadKatexConstructions();
        }
        
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
