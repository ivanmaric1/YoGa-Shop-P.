
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


let products = [
    {ime: 'plava prostirka', cijena: 199.99,slika: 'img/prostirka_plava.jpg'},
    {ime: 'lopta', cijena: 149.99,slika: 'img/lopta.jpg'},
    {ime: 'čarape', cijena: 99.99,slika: 'img/čarape.jpg'},
    {ime: 'blok', cijena: 199.99,slika: 'img/blok.jpg'},
    {ime: 'traka', cijena: 199.99,slika: 'img/traka.jpg'},
    {ime: 'zaobljeni blok', cijena: 199.99,slika: 'img/blok_zaobljeni.jpg'},
    {ime: 'siva prostirka', cijena: 299.99,slika: 'img/prostirka_siva.jpg'},
    {ime: 'sredstvo za pranje', cijena: 49.99,slika: 'img/sredstvo_za_pranje.jpg'},
    {ime: 'crvena prostirka', cijena: 199.99,slika: 'img/prostirka_crvena.jpg'},
    {ime: 'torba', cijena: 129.99,slika: 'img/torba.jpg'},
    {ime: 'visoke čarape', cijena: 169.99,slika: 'img/visoke_čarape.jpg'},
    {ime: 'utezi', cijena: 299.99,slika: 'img/utezi.jpg'}
]


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
            <h4>${item.cijena} Kn</h4>`
            productDOM.append(newEl)
        });
    }

    static showNumberOfItems(){
        let items = JSON.parse(localStorage.getItem('cart')).length
        cartItems.innerText = items
    }

    static addItemToBag(e) {
        if(e.target.classList.contains('bag-btn')) {
            UI.showCart()
            Storage.addItemToCart( e.target.parentElement.parentElement.querySelector('h3').innerText)
        }
        UI.displayProductIsInCart()
    }

    static showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }

    static closeCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }

    static closeCartOnOverlay(e) {
        if(e.target.classList.contains('cart-overlay')) {
            UI.closeCart()
        }
    }
}

class Cart {
    static showItem() {
        let itemsForCart = []
        let items = JSON.parse(localStorage.getItem('cart')) 
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
               <h5>${item.cijena} Kn</h5>
               <span class='remove-item'>remove</span>
           </div>
           <div>
               <i class="fas fa-chevron-up"></i>
               <p class="item-amount">1</p>
               <i class="fas fa-chevron-down"></i>
           </div>`
           cartContent.append(newEl)
        })
        this.countTotal()
    }

    static deleteItem(e) {
        e.preventDefault()
        let itemDel = e.target.parentElement.firstElementChild.innerText
        if(e.target.classList.contains('remove-item')) {
            e.target.parentElement.parentElement.remove()
        }
        let cart = JSON.parse(localStorage.getItem('cart')).filter(r => r !== itemDel)
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static countTotal() {
        let total = 0;
        let items = JSON.parse(localStorage.getItem('cart')) 
        items.forEach(item => {
            for(let i = 0; i < products.length; i++) {
                if(item.toLowerCase() === products[i].ime) {
                    total += products[i].cijena
                }
            }
        })
        cartTotal.innerText = total.toFixed(2)
    }
}
    

// Local Storage
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
        cartTotal.innerText = 0
        cartContent.innerText = ''
        location.reload();
    }
}

// Events

document.addEventListener('DOMContentLoaded', UI.displayProducts(products))
document.addEventListener('DOMContentLoaded', UI.showNumberOfItems)
document.body.addEventListener('click', UI.showNumberOfItems)
cartBtn.addEventListener('click', UI.showCart)
cartDOM.addEventListener('click', Cart.deleteItem)
clearCartBtn.addEventListener('click', Storage.deleteCart)
productDOM.addEventListener('click', UI.addItemToBag)
cartOverlay.addEventListener('click', UI.closeCartOnOverlay)
closeCartBtn.addEventListener('click', UI.closeCart)