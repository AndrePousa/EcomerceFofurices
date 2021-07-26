const form = document.getElementById('form');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let nome = document.getElementById('nome').value;

    let telefone = document.getElementById('telefone').value;
    
    let email = document.getElementById('email').value;

    let endereco = document.getElementById('endereco');

    let data = {
        nome,
        telefone,       
        email,
        endereco,
    }
    let convertData = JSON.stringify(data);

    localStorage.setItem('lead', convertData)

})

