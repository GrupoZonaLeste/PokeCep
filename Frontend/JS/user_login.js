const API_GATEWAY = 'http://localhost:8000/User/login_user/'

document.addEventListener('DOMContentLoaded', (event) => {
    
    const botao = document.getElementById('btn_entrar');

    botao.addEventListener('click', () => {
        
        const email_input = document.getElementById("email").value
        const password_input = document.getElementById("senha").value

        const options = {
            method: 'POST',
            url: API_GATEWAY,
            data: {email: email_input, password: password_input}
          };
          axios.request(options).then(function(response) {
            token = response.data.token
            localStorage.setItem('token', token);
            Swal.fire({
                icon: 'success',
                title: 'Usuário encontrado!',
                showConfirmButton: false,
                timer: 1500
            }).then(function() {
                // Sucesso, redirecionar o usuário
                window.location.href = '/Frontend/HTML/cadastroPokeCep.html';
            });
        })
        .catch(function(error) {
            if (error.response && error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Usuário não encontrado!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Preencha todos os campos corretamente!',
                });
            }
          });
    });
});