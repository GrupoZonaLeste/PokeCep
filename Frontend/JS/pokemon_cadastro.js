const API_GATEWAY = 'http://localhost:8000/Pokemon/inserir_pokemon/'

document.addEventListener('DOMContentLoaded', (event) => {
    
    const botao = document.getElementById('btn_salvar');

    botao.addEventListener('click', () => {
        
        const id_pokemon = document.getElementById("nome_pokemon").value
        const cep = document.getElementById("cep").value
        const rua = document.getElementById("rua").value
        const bairro = document.getElementById("bairro").value
        const cidade = document.getElementById("cidade").value
        const uf = document.getElementById("uf").value


        const options = {
            method: 'POST',
            url: API_GATEWAY,
            data: {
                id: id_pokemon,
                cep: cep,
                rua: rua,
                bairro: bairro,
                cidade: cidade,
                UF: uf
              }
          };
          axios.request(options).then(function (response) {
            Swal.fire({
                icon: "success",
                title: "Cadastro feito com Sucesso!",
                showConfirmButton: false,
                timer: 1500
              });
          }).catch(function () {
            Swal.fire({
                icon: "error",
                title: "Ocorreu um erro no Cadastro!",
                showConfirmButton: false,
                timer: 1500
              });
          });
    });
});