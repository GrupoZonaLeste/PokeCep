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
        const bd_id = item._id.match(/\(([^)]+)\)/)[1];
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
                <button class="btn_editar" id="btn_editar_${id}" data-id="${bd_id}">EDITAR</button>
                <button class="btn_excluir" id="btn_excluir_${id}" data-id="${bd_id}">EXCLUIR</button>
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
            const data_id = event.target.getAttribute('data-id');
            Swal.fire({
                title: "Você pode alterar o ID do pokemon selecionado!",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Atualizar",
                showLoaderOnConfirm: true,
                preConfirm: async (new_name) => {
                    const update = new_name
                    editar_pokemon(data_id, new_name)
                }
              });
        }

        function handleDelete(event) {
            const data_id = event.target.getAttribute('data-id');
            Swal.fire({
                title: `Você desejar excluir?`,
                text: "está ação não pode ser revertida",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, deletar"
              }).then((result) => {
                if (result.isConfirmed) {
                response = excluir_pokemon(data_id)
                }
            });
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

async function excluir_pokemon(id){
    const options = {
        method: 'DELETE',
        url: 'http://localhost:8000/Pokemon/deletar_pokemon/',
        params: {id: id},
      };
      
      axios.request(options).then(function (response) {
        returned = response.data.STATUS
        if(returned = {"STATUS":"DELETED"}){
            Swal.fire({
                title: "Deletado!",
                text: "Este arquivo foi excluido com sucesso!",
                icon: "success"
              }).then((result) => {
                // Verifique se o usuário confirmou a ação no SweetAlert
                if (result.isConfirmed) {
                    // Atualize a página
                    location.reload();
                }
            }
        )
        }else{
            Swal.fire({
                title: "Occoreu um erro!",
                text: "Este arquivo não foi encontrado!",
                icon: "warning"
              });
        }
      }).catch(function (error) {
        Swal.fire({
            title: "Occoreu um erro!",
            text: "Não foi possivel concluir esta ação!",
            icon: "warning"
          });
        return error
      });
}

async function editar_pokemon(id,name){
    const options = {
        method: 'PUT',
        url: 'http://localhost:8000/Pokemon/editar_pokemon/',
        params: {
          id: id,
          name: name,
        },
      };
      axios.request(options).then(function (response) {
        console.log(response.data);
        location.reload();
      }).catch(function (error) {
        console.error(error);
      });
}