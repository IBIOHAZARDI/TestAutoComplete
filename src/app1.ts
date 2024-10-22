import axios from 'axios';

// Elemento de entrada y contenedor de sugerencias
const inputElement = document.getElementById('input-text1') as HTMLInputElement;
const suggestionsContainer = document.getElementById('suggestions1') as HTMLDivElement;

// Función para buscar sinónimos
async function fetchSynonyms(word: string): Promise<string[]> {
    try {
        //const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}&max=5`);
        const response = await axios.get(`https://api.datamuse.com/words?ml=${word}&max=5`);
        return response.data.map((item: any) => item.word);
    } catch (error) {
        console.error('Error fetching synonyms:', error);
        return [];
    }
}

// Manejar la entrada del usuario
inputElement.addEventListener('input', async () => {
    const word = inputElement.value;
    if (!word) {
        suggestionsContainer.innerHTML = '';
        return;
    }
    
    const synonyms = await fetchSynonyms(word);
    suggestionsContainer.innerHTML = synonyms.map(synonym => `<div>${synonym}</div>`).join('');
});

// Cargar los sinónimos iniciales para una palabra de ejemplo
document.addEventListener('DOMContentLoaded', async () => {
    const initialSynonyms = await fetchSynonyms('ejemplo');
    suggestionsContainer.innerHTML = initialSynonyms.map(synonym => `<div>${synonym}</div>`).join('');
});
