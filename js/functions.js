
const basketQuantityLabel = document.getElementById('cartAmount');
const totalBasketPriceLabel = document.querySelector('.label');

const formatPrice = new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'USD' });


const updateCardQuantity = function (id, index, quantity) {
    const cardQuantityLabel = document.querySelector(`#quantity-${id}`);

    cardQuantityLabel.textContent = quantity;
}

const updateBasketQuantity = function () {
    const totalQuantity = basket.reduce((acc, cur) => acc + cur[1], 0);
    
    basketQuantityLabel.textContent = totalQuantity;
}

const totalBasketPrice = function() {


    basket.reduce((acc, cur) => acc + cur,0)
    html = 
        `<h2>>Total Bill: ${formatPrice.format(sum)}</h2>`
}

const setBasketLocalStorage = function() {
    localStorage.setItem('data', JSON.stringify(basket));
}



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