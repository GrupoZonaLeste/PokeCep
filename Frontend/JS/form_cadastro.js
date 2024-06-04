document.addEventListener('DOMContentLoaded', (event) => {
    const pokemon = document.getElementById("nome_pokemon");
    const cep = document.getElementById("cep");
    const botao = document.getElementById("btn_salvar");

    // Function to check if inputs are empty
    function verificaCampos() {
        if (pokemon.value.trim() === "" || cep.value.trim() === "") {
            // If either input is empty, disable the button
            botao.disabled = true;
        } else {
            // If both inputs have values, enable the button
            botao.disabled = false
        }
    }

    // Add event listeners to inputs to check when they change
    pokemon.addEventListener("input", verificaCampos);
    cep.addEventListener("input", verificaCampos);

    // Call verificaCampos initially to check the inputs on page load
    verificaCampos();
});