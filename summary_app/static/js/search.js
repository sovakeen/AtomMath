// // search functionality
// const searchInput = document.getElementById('search-input');
// const searchResults = document.getElementById('search-results');

// function updateSearch() {
//     const searchText = searchInput.value.toLowerCase().trim();
//     const terms = Array.from(document.querySelectorAll('ul li a')).map(a => ({
//         id: a.getAttribute('data-id') || '',
//         name: a.textContent.trim(),
//         href: a.href
//     }));
    
//     if (searchText === '') {
//         searchResults.style.display = 'none';
//         return;
//     }

//     const matches = terms.filter(term => 
//         term.name.toLowerCase().includes(searchText) || 
//         (term.id && term.id.toLowerCase().includes(searchText))
//     );

//     if (matches.length > 0) {
//         searchResults.innerHTML = matches
//             .map(term => `<a href="${term.href}">${term.id || ''}: ${term.name}</a>`)
//             .join('');
//     } else {
//         searchResults.innerHTML = '<div class="no-results">No matching terms found</div>';
//     }
    
//     searchResults.style.display = 'block';
// }

// // add event listeners
// searchInput.addEventListener('input', updateSearch);

// // close search results when clicking outside
// document.addEventListener('click', function(e) {
//     if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
//         searchResults.style.display = 'none';
//     }
// });

// // keep search results open when clicking inside
// searchResults.addEventListener('click', function(e) {
//     e.stopPropagation();
// });
