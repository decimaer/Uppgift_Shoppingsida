const shop = document.getElementById('shop');
const categoriesContainer = document.getElementById('categories');

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Produktdatat finns i variabeln shopData (se data.js)

const generateShop = () => {
    // Generera alla produkter med dynamisk HTML och Array.protype.map() samt join()
    //
    // Använd denna markup för varje produktkort - den korresponderar mot CSS:en
    //
    const categories = new Set;

    Object.values(shopData).forEach(({
        id, 
        title, 
        price, 
        description, 
        category, 
        image, 
        rating,
    }) => { 

        const [_, quantity] = basket.find(item => item[0] == id) || [undefined, 0];

        const descriptionShortened = description.slice(0, 30) + '...';

        const productCard =
        `<div id=product-id-${id} class="item" data-cat="${category}">
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

        categories.add(category);
    });

    updateBasketQuantity();

    //generate categories
    categories.forEach(item => {
        categoriesContainer.insertAdjacentHTML('beforeend', 
        `<button class="btnCategory">${item}</button>`
        );
    });

    categoriesContainer.addEventListener('click', function(e) {
        filterCategory(e.target.textContent);
    })

}
generateShop()

const allProductElements = document.querySelectorAll('.item') 

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
    const [
        productId, 
        quantity
    ] = handleDecrement(id);

    updateBasketQuantity();

    setBasketLocalStorage();

    updateCardQuantity(productId, quantity);
}

const filterCategory = function (category) {
    if (category == 'All categories') {
        allProductElements.forEach(item => {
            item.classList.remove('hide');
        });    
        return;
    }

    allProductElements.forEach(item => {
        if (item.dataset.cat != category) {
            item.classList.add('hide');
        } else {
            item.classList.remove('hide');
        }
    });
}