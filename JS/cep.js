document.addEventListener('DOMContentLoaded', () => {

const inputCep = document.getElementById('cep');
const inputRua = document.getElementById('rua');
const inputCidade = document.getElementById('cidade');



    inputCep.addEventListener('blur', () => {
        const cep = inputCep.value.replace(/\D/g, '');
        if (cep !== '') {
            pesquisacep(cep);
        }
    });

    function limpa_formulário_cep() {
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('uf').value = '';
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            document.getElementById('rua').value = conteudo.logradouro;
            document.getElementById('bairro').value = conteudo.bairro;
            document.getElementById('cidade').value = conteudo.localidade;
            document.getElementById('uf').value = conteudo.uf;
        } else {
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }

    function pesquisacep(valor) {
    const cep = valor.replace(/\D/g, '');
        if (cep !== "") {
            const validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            document.getElementById('rua').value = '...';
            document.getElementById('bairro').value = '...';
            document.getElementById('cidade').value = '...';
            document.getElementById('uf').value = '...';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
                return response.json();
            })
        .then(data => meu_callback(data))
        .catch(error => console.log('error', error));
            } else {
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
            } else {
                limpa_formulário_cep();
            }
    }
});