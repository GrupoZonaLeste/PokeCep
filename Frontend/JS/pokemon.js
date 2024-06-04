document.addEventListener('DOMContentLoaded', () => {

const PokemonName = document.querySelector('.pokemon_nome');
const PokemonNumber = document.querySelector('.pokemon_numero');
const PokemonImage = document.querySelector('.pokemon_imagem');

const form = document.querySelector('.formulario');
const input = document.querySelector('.input_pokemon');



    let searchPokemon = 1;

    const fetchPokemon = async (pokemon) => {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        }
    }

    const renderPokemon = async (pokemon) => {
        PokemonName.innerHTML = 'Buscando..';
        PokemonNumber.innerHTML = '';

        const data = await fetchPokemon(pokemon);

        if (data) {
            PokemonImage.style.display = 'flex';
            PokemonName.innerHTML = data.name;
            PokemonNumber.innerHTML = data.id;
            PokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
            searchPokemon = data.id;
        } else {
            PokemonImage.style.display = 'none';
            PokemonName.innerHTML = 'Não Encontrado!';
            PokemonNumber.innerHTML = '';
        }
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
    });

    input.addEventListener('blur', () => {
        renderPokemon(input.value.toLowerCase());
    });

    renderPokemon(searchPokemon);
});