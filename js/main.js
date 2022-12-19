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

        const descriptionShortened = description.slice(0, 30) + '...';

        const productCard =
        `<div id=product-id-${id} class="item">
            <img width="220" src=${image} alt=""> 
            <div class="details">
                <h3>${title}</h3>
                <p>${descriptionShortened}</p>
                <div class="price-quantity">
                <h2>${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    </div>
                    <div id=${id} class="quantity">???</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                </div>
            </div>
        </div>`;

        shop.insertAdjacentHTML('beforeend', productCard)
    });



}

generateShop()

const increment = (id) => {
    // Om användaren klickar på + på produkten 
   let index = basket.findIndex(item => item[0] == id);

    if (index == -1) {
        basket.push([id, 0]); 
        index = basket.length > 0 ? basket.length - 1 : 0;
    }

    basket[index][1] += 1;

    console.log(basket[index][1])
    // Update cart number
    // Update card number
}

const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    let index = basket.findIndex(item => item[0] == id);

    if (index == -1) return;

    if (basket[index][1] == 1) {
        basket.splice(index, 1);
        return;
    }

    basket[index][1] -= 1;

    console.log(basket[index][1])

}
