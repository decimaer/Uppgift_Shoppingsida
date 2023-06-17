
const basketQuantityLabel = document.getElementById('cartAmount');
const totalBasketPriceLabel = document.querySelector('.label');

const formatPrice = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD' });


const updateCardQuantity = function (id, quantity) {
    const cardQuantityLabel = document.querySelector(`#quantity-${id}`);

    cardQuantityLabel.textContent = quantity;
}

const updateBasketQuantity = function () {
    const totalQuantity = basket.reduce((acc, cur) => acc + cur[1], 0);

    basketQuantityLabel.textContent = totalQuantity;
}

const totalBasketPrice = function() {

    const sum = shopData.reduce((acc, cur) => {
        index = basket.findIndex(item => item[0] == cur.id)

        if (index == -1) return acc;

        return acc + cur.price * basket[index][1];
    },0)

    const totalBill = 
        `<h2>Total Bill: ${formatPrice.format(sum)}</h2>`

    totalBasketPriceLabel.innerHTML = totalBill;
    
}

const updateCardSum = function (productId, quantity) {
    const priceSumLabel = document.getElementById(`productSum-${productId}`);
    const product = shopData.find(item => item.id == productId)

    const sum = quantity * product.price;

    priceSumLabel.textContent = formatPrice.format(sum);
}

const setBasketLocalStorage = function() {
    localStorage.setItem('data', JSON.stringify(basket));
}

const handleIncrement = (id) => {
    // Om användaren klickar på + på produkten 
    let quantity = 0;
    let index = basket.findIndex(item => item[0] == id);

    if (index == -1) {
        basket.push([id, 0]); 
        index = basket.length > 0 ? basket.length - 1 : 0;
    }

    basket[index][1] += 1;
    quantity = basket[index][1];

    //gtag 
    gtag('event', 'button_click', {
        'event_category': 'Product interactions',
        'event_label': 'adding product to cart',
        'value': 1
        }

    return [id, quantity]
}

const handleDecrement = (id) => {
    // Om användaren klickar på - på produkten 
    let quantity = 0;
    const index = basket.findIndex(item => item[0] == id);

    if (index == -1) return [id, 0];

    if (basket[index][1] == 1) {
        basket.splice(index, 1);
    } else {
        basket[index][1] -= 1;
        quantity = basket[index][1];
    }

    return [id, quantity]

}
