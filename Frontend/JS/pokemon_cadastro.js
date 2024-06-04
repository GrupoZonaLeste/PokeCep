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
        console.log(uf)

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
          }).catch(function (error) {
            if (error.response && error.response.status === 422) {
              Swal.fire({
                icon: "error",
                title: "Erro de validação",
                text: "Os dados fornecidos não são válidos.",
                showConfirmButton: true
              })
            }else if (error.response && error.response.status === 401) {
                Swal.fire({
                  icon: "error",
                  title: "Erro de validação",
                  text: "Sua sessão expirou!",
                  showConfirmButton: true
                })
            }else{
            Swal.fire({
                icon: "error",
                title: "Ocorreu um erro no Cadastro!",
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
    });
});