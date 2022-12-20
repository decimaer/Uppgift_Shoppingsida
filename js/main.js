const shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Produktdatat finns i variabeln shopData (se data.js)

const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //

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
    const [
        productId, 
        quantity
    ] = handleIncrement(id);

    updateBasketQuantity();

    setBasketLocalStorage();

    updateCardQuantity(productId, quantity);
}

const decrement = (id) => {
    console.log(id)
    const [
        productId, 
        quantity
    ] = handleDecrement(id);

    updateBasketQuantity();

    setBasketLocalStorage();

    updateCardQuantity(productId, quantity);
}