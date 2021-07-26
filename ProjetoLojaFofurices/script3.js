const form = document.getElementById('form');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    let nome = document.getElementById('nome').value;

    let descricao = document.getElementById('descricao').value;
    
    let preco = document.getElementById('preco').value;

    let data = {
        nome,
        descricao,       
        preco,      
    }
    let convertData = JSON.stringify(data);

    localStorage.setItem('lead', convertData)
})