import sinonimos from './utils/sinonimos.json';

const inputElement = document.getElementById('input-text1') as HTMLInputElement;
const suggestionsContainer = document.getElementById('suggestions1') as HTMLDivElement;

function fetchSynonyms(word: string): string[] {
    const sinonimo = sinonimos[word.toLowerCase()];
    return sinonimo || [];
}

inputElement.addEventListener('input', () => {
    const word = inputElement.value.trim().toLowerCase();
    if (!word) {
        suggestionsContainer.innerHTML = '';
        return;
    }
    
    const synonyms = fetchSynonyms(word);
    suggestionsContainer.innerHTML = synonyms.map(synonym => `<div>${synonym}</div>`).join('');
});

document.addEventListener('DOMContentLoaded', () => {
    const initialSynonyms = fetchSynonyms('login');
    suggestionsContainer.innerHTML = initialSynonyms.map(synonym => `<div>${synonym}</div>`).join('');
});
