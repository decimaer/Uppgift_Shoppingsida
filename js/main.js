const shop = document.getElementById('shop');
const cartQuantityLabel = document.getElementById('cartAmount')
 
let basket = JSON.parse(localStorage.getItem("data")) || [];

// Produktdatat finns i variabeln shopData (se data.js)

const updateCardQuantity = function (id, index, quantity) {
    const cartQuantityLabel = document.querySelector(`#quantity-${id}`);

    cartQuantityLabel.textContent = quantity;
}

const updateBasketQuantity = function () {
    const totalQuantity = basket.reduce((acc, cur) => acc + cur[1], 0)
    cartQuantityLabel.textContent = totalQuantity;
}

const setBasketLocalStorage = function() {
    localStorage.setItem('data', JSON.stringify(basket));
}

const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    const formatPrice = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD' });

    Object.values(shopData).forEach(({
        id, 
        title, 
        price, 
        description, 
        category, 
        image, 
        rating,
    }) => { 

        const [_, quantity] = basket.find(item => item[0] == id) || [0, 0];

        const descriptionShortened = description.slice(0, 30) + '...';

        const productCard =
        `<div id=product-id-${id} class="item">
            <img width="220" src=${image} alt=""> 
            <div class="details">
                <h3>${title}</h3>
                <p>${descriptionShortened}</p>
                <div class="price-quantity">
                <h2>${formatPrice.format(price)}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=quantity-${id} class="quantity">${quantity}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                </div>
            </div>
        </div>`;

        shop.insertAdjacentHTML('beforeend', productCard)
    });

    updateBasketQuantity();

}

generateShop()

const increment = (id) => {
    // Om användaren klickar på + på produkten 
    let quantity = 0;
    let index = basket.findIndex(item => item[0] == id);

    if (index == -1) {
        basket.push([id, 0]); 
        index = basket.length > 0 ? basket.length - 1 : 0;
    }

    basket[index][1] += 1;
    quantity = basket[index][1];

    updateCardQuantity(id, index, quantity);

    updateBasketQuantity();

    setBasketLocalStorage();
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    let quantity = 0;
    const index = basket.findIndex(item => item[0] == id);

    if (index == -1) return;

    if (basket[index][1] == 1) {
        basket.splice(index, 1);
    } else {
        basket[index][1] -= 1;
        quantity = basket[index][1];
    }

    updateCardQuantity(id, index, quantity);

    updateBasketQuantity();

    setBasketLocalStorage();

}
