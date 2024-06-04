async function fetchPokemonData(pokemonId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

async function displayData(data) {
    const listagemDiv = document.getElementById('listagem');
    listagemDiv.innerHTML = '';
    for (const item of data) {
        const id = item.id;
        const pokemonData = await fetchPokemonData(id);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('pokemon2'); // Adding a class for styling

        itemDiv.innerHTML = `
            <div class="pokedex" style="height: 100%; flex-direction: row;">
                <div class="acoplamento">
                    <div class="pokemon_nome">ID: ${id}</div>
                    <img src="${pokemonData ? pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] : ''}" class="pokemon_imagem" alt="Imagem do Pokemon">
                    <div class="pokemon_numero">Cidade: ${item.cidade}</div>
                </div>
                <div>
                    <p>CEP: ${item.cep}</p>
                    <p>Rua: ${item.rua}</p>
                    <p>Bairro: ${item.bairro}</p>
                    <p>Cidade: ${item.cidade}</p>
                    <p>Uf: ${item.UF}</p>
                </div>
            </div>
            <div class="btns">
                <button class="btn_editar" id="btn_editar_${id}" data-id="${id}">EDITAR</button>
                <button class="btn_excluir" id="btn_excluir_${id}" data-id="${id}">EXCLUIR</button>
            </div>
        `;
        listagemDiv.appendChild(itemDiv);
    }
    const editButtons = document.querySelectorAll('.btn_editar');
            const deleteButtons = document.querySelectorAll('.btn_excluir');

            editButtons.forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        

        function handleEdit(event) {
            const id = event.target.getAttribute('data-id');
            alert(`Edit button clicked for ID: ${id}`);
            // Add your edit logic here
        }

        function handleDelete(event) {
            const id = event.target.getAttribute('data-id');
            alert(`Delete button clicked for ID: ${id}`);
            // Add your delete logic here
        }
}

document.addEventListener('DOMContentLoaded', async () => {
    try{
        buscar()
    }catch{

    }
    const input_busca = document.getElementById("busca")
    input_busca.addEventListener("input", buscar);
    async function buscar() {
        const cep = document.getElementById("busca").value;
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/Pokemon/listar_pokemon/',
            params: {cep: cep},
        };

        try {
            const response = await axios.request(options);
            const data = response.data;
            displayData(data);
        } catch (error) {
            console.error(error);
        }
    }
});
