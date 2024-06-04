const API_GATEWAY = 'http://localhost:8000/User/cadastrar_user/'

document.addEventListener('DOMContentLoaded', (event) => {
    
    const botao = document.getElementById('btn_cadastrar');

    botao.addEventListener('click', () => {
        
        const email_input = document.getElementById("email").value
        const password_input = document.getElementById("senha").value

        const options = {
            method: 'POST',
            url: API_GATEWAY,
            data: {email: email_input, password: password_input}
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