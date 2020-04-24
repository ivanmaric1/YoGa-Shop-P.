
const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartFooter = document.querySelector('.cart-footer')
const cartContent = document.querySelector('.cart-content')
const productDOM = document.querySelector('.products-center')

let cart = []

let products = [
    {ime: 'plava prostirka', cijena: 199.99,slika: 'img/prostirka_plava.jpg'},
    {ime: 'lopta', cijena: 149.99,slika: 'img/lopta.jpg'},
    {ime: 'čarape', cijena: 99.99,slika: 'img/čarape.jpg'},
    {ime: 'blok', cijena: 199.99,slika: 'img/blok.jpg'},
    {ime: 'traka', cijena: 199.99,slika: 'img/traka.jpg'},
    {ime: 'zaobljeni blok', cijena: 199.99,slika: 'img/blok_zaobljeni.jpg'},
    {ime: 'siva prostirka', cijena: 299.99,slika: 'img/prostirka_siva.jpg'},
    {ime: 'crvena prostirka', cijena: 199.99,slika: 'img/prostirka_crvena.jpg'},
]


//display products
class UI {
    static displayProducts(products) {
        products.forEach(item => {
            let newEl = document.createElement('article')
            newEl.classList.add('product')
            
            newEl.innerHTML = `
            <div class="img-container">
                <img src="${item.slika}" alt="${item.ime}" class='product-img'>
                <button class='bag-btn' data-id='1'>
                <i class="fas fa-shopping-cart"></i>
                add to bag
                </button>
            </div>
            <h3>${item.ime}</h3>
            <h4>${item.cijena} kn</h4>
            `
            productDOM.append(newEl)
        });
    }

    static addItemToBag(e) {
        if(e.target.classList.contains('bag-btn')) {
            cartOverlay.classList.add('transparentBcg')
            Storage.addItemToCart( e.target.parentElement.parentElement.querySelector('h3').innerText)
        }
    }

    static closeCart() {
        cartOverlay.classList.remove('transparentBcg')
    }
}

class Cart {
    static showItem() {
        let items = JSON.parse(localStorage.getItem('cart')) 
        let itemsForCart = []
        items.forEach(item => {
            for(let i = 0; i < products.length; i++) {
                if(item.toLowerCase() === products[i].ime) {
                    itemsForCart.push(products[i])
                }
            }
        })
        cartContent.innerHTML = ''
        itemsForCart.forEach((item) => {
           let newEl = document.createElement('div')
           newEl.classList.add('cart-item')
           newEl.innerHTML = `
           <img src="${item.slika}" alt="${item.ime}">
           <div>
               <h4>${item.ime}</h4>
               <h5>${item.cijena} kn</h5>
               <span class='remove-item'>remove</span>
           </div>
           <div>
               <i class="fas fa-chevron-up"></i>
               <p class="item-amount">1</p>
               <i class="fas fa-chevron-down"></i>
           </div>
           `
           cartContent.append(newEl)
        })
    }
}



               
            

// loca storage
class Storage {
    static addItemToCart(item) {
        if(localStorage.getItem('cart') === null) {
            let cart = []
            cart.push(item)
            localStorage.setItem('cart', JSON.stringify(cart))
        } else {
            let cart = JSON.parse(localStorage.getItem('cart'))  
            if(!cart.includes(item)) {
                cart.push(item)
            }
            localStorage.setItem('cart', JSON.stringify(cart))
        }
        Cart.showItem()
    }

    static deleteCart() {
        localStorage.removeItem('cart')
        
    }
}

document.addEventListener('DOMContentLoaded', UI.displayProducts(products))

clearCartBtn.addEventListener('click', Storage.deleteCart)
productDOM.addEventListener('click', UI.addItemToBag)
cartOverlay.addEventListener('click', UI.closeCart)
closeCartBtn.addEventListener('click', UI.closeCart)