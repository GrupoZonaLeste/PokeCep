document.addEventListener('DOMContentLoaded', () =>{

    const btn_editar = document.getElementById('btn_editar')
    const container = document.getElementById('container')

    btn_editar.addEventListener('click', () =>{
        container.style.display = 'flex' 
    })
});