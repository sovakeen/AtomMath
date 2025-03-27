async function swapTerms(id1, id2) {
    try {
        const response = await fetch('/summary_app/swap_terms/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}'
            },
            body: JSON.stringify({ id1: id1, id2: id2 })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Swap failed: ${result.message || 'Unknown error'}`);
        }
        console.log(`Backend swap successful: ${id1} <-> ${id2}`);
        return true;
    } catch (error) {
        console.error('Error swapping terms:', error);
        alert('Failed to swap terms. Please try again.');
        return false;
    }
}

async function moveTerm(id, direction) {
    const termList = Array.from(document.querySelectorAll('#term-list li'));
    const currentItem = termList.find(li => li.getAttribute('data-id') === id);
    const currentIndex = termList.indexOf(currentItem);

    let targetIndex;
    if (direction === 'up' && currentIndex > 0) {
        targetIndex = currentIndex - 1;
    } else if (direction === 'down' && currentIndex < termList.length - 1) {
        targetIndex = currentIndex + 1;
    } else {
        return;
    }

    const targetItem = termList[targetIndex];
    const targetId = targetItem.getAttribute('data-id');

    const success = await swapTerms(id, targetId);
    if (success) {
        // Clone the elements to ensure a fresh DOM update
        const currentClone = currentItem.cloneNode(true);
        const targetClone = targetItem.cloneNode(true);

        // ??? (already stored as id and targetId) Store original attributes before swapping
        const currentDataId = currentClone.getAttribute('data-id');
        const targetDataId = targetClone.getAttribute('data-id');
        
        // Update data-id attributes
        currentClone.setAttribute('data-id', targetDataId);
        targetClone.setAttribute('data-id', currentDataId);

        // Update displayed IDs
        currentClone.querySelector('.id').innerHTML = `${targetId} `
        targetClone.querySelector('.id').innerHTML = `${id} `

        // Update onclick attributes of child buttons
        const currentUpButton = currentClone.querySelector('.move-up');
        const currentDownButton = currentClone.querySelector('.move-down');
        const targetUpButton = targetClone.querySelector('.move-up');
        const targetDownButton = targetClone.querySelector('.move-down');

        if (currentUpButton) {
            currentUpButton.setAttribute('onclick', `moveTerm('${targetDataId}', 'up')`);
        }
        if (currentDownButton) {
            currentDownButton.setAttribute('onclick', `moveTerm('${targetDataId}', 'down')`);
        }
        if (targetUpButton) {
            targetUpButton.setAttribute('onclick', `moveTerm('${currentDataId}', 'up')`);
        }
        if (targetDownButton) {
            targetDownButton.setAttribute('onclick', `moveTerm('${currentDataId}', 'down')`);
        }

        // Replace original elements with clones in swapped positions
        const parent = currentItem.parentNode;
        if (currentIndex < targetIndex) {
            parent.replaceChild(targetClone, currentItem);
            parent.replaceChild(currentClone, targetItem);
        } else {
            parent.replaceChild(currentClone, targetItem);
            parent.replaceChild(targetClone, currentItem);
        }
    }
}