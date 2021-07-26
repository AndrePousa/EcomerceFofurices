const c = (el) => {
    return document.querySelector(el);
}

//const c = (el) => docment.querySelector(el);

const cs = (el) => {
    return document.querySelector(el);
}

let modalQt = 1;
let cart = [];
let modalKey = 0;

//const cs = (el) => docment.querySelector(el);

//Lista dos presentes
presentesJson.map((item, index) =>{
    let presentesItem = document.querySelector('.models .presentes-item').cloneNode(true);
     //preencher as informações de presentesitem

    presentesItem.setAttribute('data-key', index);
    presentesItem.querySelector('.presentes-item--img img').src = item.img;
    presentesItem.querySelector('.presentes-item--name').innerHTML = item.name;
    presentesItem.querySelector('.presentes-item--desc').innerHTML = item.description;
    presentesItem.querySelector('.presentes-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; 
    presentesItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.presentes-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
     
        //preenchendo as informações no modal
        c('.presentesBig img').src = presentesJson[key].img;
        c('.presentesInfo h1').innerHTML = presentesJson[key].name;
        c('.presentesInfo--desc').innerHTML = presentesJson[key].description;
        c('.presentesInfo--actualPrice').innerHTML = `R$ ${presentesJson[key].price.toFixed(2)}`;

           
        //abertura do modal
        c('.presentesInfo--qt').innerHTML = modalQt;

        c('.presentesWindowArea').style.opacity = 0; 
        c('.presentesWindowArea').style.display = 'flex';
        setTimeout(() =>{
            c('.presentesWindowArea').style.opacity = 1;
        },200);
    });

    c('.presentes-area').append( presentesItem);
});

//Eventos do Modal 
function closeModal(){
    c('.presentesWindowArea').style.opacity = 0; 
    setTimeout(()=>{
        c('.presentesWindowArea').style.display = 'none';
    }, 500);
}

//Botões de cancelar não entraram no array
c('.presentesInfo--cancelButton').addEventListener('click', closeModal);
c('.presentesInfo--cancelMobileButton').addEventListener('click', closeModal);

//botão de -
c('.presentesInfo--qtmenos').addEventListener('click', () =>{
    if(modalQt > 1){
        modalQt--;
        c('.presentesInfo--qt').innerHTML = modalQt;
    }
    
});
//botão de +
c('.presentesInfo--qtmais').addEventListener('click', () =>{
    modalQt++;
    c('.presentesInfo--qt').innerHTML = modalQt;
});

c('.presentesInfo--addButton').addEventListener('click', ()=>{
    
    let identifier = presentesJson[modalKey].id;

    let key = cart.findIndex((item)=> item.identifier == identifier);

    if(key > -1){
        cart[key].qt +=modalQt;
    }
    else{
        cart.push({
            identifier,
            id:presentesJson[modalKey].id,
            qt:modalQt
        });
    } 
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0 ){
        c('aside').style.left = '0';
    }
});

c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw'; 
})

//mostrar o carrinho
function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = ' ';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let presentesItem = presentesJson.find((item)=>item.id == cart[i].id);
           //     return item.id = cart[i].id; 
           subtotal += presentesItem.price * cart[i].qt;

           let cartItem =c('.models .cart--item').cloneNode(true); 

           cartItem.querySelector('img').src = presentesItem.img;
           cartItem.querySelector('.cart--item-nome').innerHTML = presentesItem.name;
           cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt; 

           cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () =>{
               if(cart[i].qt > 1){
                   cart[i].qt--;
               }
               else{
                   cart.splice(i, 1);
               }
                updateCart();
           })
           cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () =>{
               cart[i].qt++;
               updateCart();
            })


           c('.cart').append(cartItem);

        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    }
    else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}




