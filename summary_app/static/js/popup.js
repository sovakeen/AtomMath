document.addEventListener('DOMContentLoaded', () => {
    const popupContainers = document.querySelectorAll('.popup-container');

    // ensure containers exist
    if (!popupContainers.length) return;

    // function to load and populate katex constructions for a specific menu
    async function loadKatexConstructions(popupMenu) {
        const popupList = popupMenu.querySelector('ul');
        if (!popupList) return;

        try {
            const response = await fetch('/static/katex/katex_constructions.txt');
            const text = await response.text();
            
            popupList.innerHTML = '';
            
            const lines = text.split('\n')
                .filter(line => line.trim() && !line.startsWith('#'));
            
            lines.forEach(elem => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="katex-render">$${elem}$</span>
                    <span class="katex-text">${elem}</span>
                `;
                li.onclick = () => navigator.clipboard.writeText(elem);
                popupList.appendChild(li);
            });

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

    // initialize each popup container
    popupContainers.forEach(container => {
        const popupMask = container.querySelector('.popup-mask');
        const popupMenu = container.querySelector('.popup-menu');
        
        if (!popupMask || !popupMenu) return;

        // toggle popup visibility
        popupMask.addEventListener('click', (event) => {
            event.stopPropagation();
            
            if (!popupMenu.classList.contains('show') && container.classList.contains('katex-popup')) {
                loadKatexConstructions(popupMenu);
            }
            
            popupMenu.classList.toggle('show');
        });

        // close popup when clicking outside
        document.addEventListener('click', (event) => {
            if (!popupMenu.contains(event.target) && 
                event.target !== popupMask) {
                popupMenu.classList.remove('show');
            }
        });
    });
});
