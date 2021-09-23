const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';



class ProductsList {
    constructor(container = '.products') {
        this.basket_list = [];
        this.counter = 0;
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.render();
                // this.add_to_basket();
            });
    }

    _getProducts() {
        return fetch(`${API}getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }

    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    // add_to_basket(event) {
    //     const basket = document.querySelector('.basket');
    //     basket.insertAdjacentHTML('beforeend', event.basket_render());
    // }
    render() {
        const block = document.querySelector(this.container);
        let i = 0
        let content = this.goods;
        for (let product of this.goods) {
            i += 1
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render(i));
        }
        let elems = document.querySelectorAll('.add-to-basket');
        var basket = document.querySelector('.basket');
        let delete_button = []
        elems.forEach(function (elem) {
            elem.addEventListener('click', function (event) {
                let index = event.target.parentNode.parentNode.id;
                let Object = new ProductItem(content[+index - 1]);
                basket.insertAdjacentHTML('beforeend', Object.basket_render());
                delete_button.push(document.querySelectorAll('.delete_from_basket'));
                deleter(delete_button);
            })
            function deleter(delete_buttons) {
                delete_buttons.forEach(function (elems) {
                    elems.forEach(function (elem) {
                        elem.addEventListener('click', function (event) {
                            event.target.parentNode.parentNode.remove();
                        })
                    })

                })
            }

        })
    }



}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150', basket_img = 'https://via.placeholder.com/60x100') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.basket_img = basket_img;
    }
    render(i) {
        return `<div class="product-item" data-id="${this.id}"  id=${i}>
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h1>${this.title}</h1>
                        <p>${this.price}</p>
                        <button class="buy-btn">Купить</button>
                        <button class="add-to-basket">Add to basket</button>
                    </div>
                </div>`

    }
    basket_render() {
        return `<div class="product">
                    <img src="${this.basket_img}" alt="">
                    <div class="product_content">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="delete_from_basket">удолить</button>
                    </div>
                </div>`
    }
}


let list = new ProductsList();



