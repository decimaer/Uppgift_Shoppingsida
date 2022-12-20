let shoppingCart = document.getElementById("shopping-cart")
const btnClearCart = document.getElementById('clearCartButton');

let basket = JSON.parse(localStorage.getItem("data")) || []


// Produktdatat finns i variabeln shopData (se data.js)


const generateCartItems = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en

    basket.forEach(item => {
        productId = item[0];

        const quantity = item[1];

        const {   
            id, 
            title, 
            price, 
            description, 
            category, 
            image, 
            rating
        } = shopData.find(item => item.id == productId);

        productCard =
        `<div id=cart-item-${id} class="cart-item">
        <img width="100" src=${image} alt="" />
        <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
                <p>${title}</p>
                <p class="cart-item-price">${formatPrice.format(price)}</p>
            </h4>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=quantity-${id} class="quantity">${quantity}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3 id="productSum-${id}"> ${formatPrice.format(quantity * price)}</h3>
        </div>
        </div>`;

        shoppingCart.insertAdjacentHTML('beforeend', productCard)
    });
    
    updateBasketQuantity();

    totalBasketPrice();
 
}

generateCartItems();

const increment = (id) => {
    const [
        productId, 
        quantity
    ] = handleIncrement(id);

    updateBasketQuantity();

    setBasketLocalStorage();

    updateCardQuantity(productId, quantity);

    updateCardSum(productId, quantity);

    totalBasketPrice();
}

const decrement = (id) => {
    const [
        productId, 
        quantity
    ] = handleDecrement(id);

    updateBasketQuantity();

    setBasketLocalStorage();

    updateCardQuantity(productId, quantity);

    updateCardSum(productId, quantity);

    totalBasketPrice();
}

const removeItem = function (id) {
    basket.splice(basket.findIndex(item => item[0] == id), 1);

    document.getElementById(`cart-item-${id}`).remove()

    updateBasketQuantity();

    setBasketLocalStorage();

    totalBasketPrice();
}

btnClearCart.addEventListener('click', function() {
    if (basket.length == 0) return;

    shoppingCart.innerHTML = 'Shopping cart is empty!';
    basket = [];

    updateBasketQuantity();

    setBasketLocalStorage();

    totalBasketPrice();
});

const init = function () {
    if (basket.length == 0) {
        shoppingCart.innerHTML = 'Shopping cart is empty!';
    }
}
init();