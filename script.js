let cart = [];
// let pizzaQtd = 1;
let modalKey = 0;

const getElement = (el) => document.querySelector(el);
const getElements = (el) => document.querySelectorAll(el);

// Método de fechar Modal
const closeModal = () => {
  getElement('.pizzaWindowArea').classList.remove('active');
};

// Listagem de Pizzas
pizzaJson.map((item, index) => {
  const showModal = (e) => {
    e.preventDefault();

    pizzaItem.setAttribute('data-key', index);

    const element = e.target;
    element.classList.add('pizza-item');
    let key = element.parentNode.getAttribute('data-key');
    let pizzaQtd = 1;
    modalKey = key;

    getElement('.pizzaWindowBody img').src = pizzaJson[key].img;
    getElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    getElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    getElement('.pizzaInfo--size span').innerHTML = pizzaJson[key].sizes[0];
    getElement('.pizzaInfo--size span').innerHTML = pizzaJson[key].sizes[1];
    getElement('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    getElement('.pizzaInfo--size.selected').classList.remove('selected');
    getElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
      if (sizeIndex == 2) {
        size.classList.add('selected');
      }
    });

    getElement('.pizzaWindowArea').classList.add('active');
    getElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.addEventListener('click', () => {
        getElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
      });
    });

    getElement('.pizzaInfo--qtmenos').addEventListener('click', () => {
      if (pizzaQtd > 1) {
        pizzaQtd--;
        getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;
      }
    });

    getElement('.pizzaInfo--qtmais').addEventListener('click', () => {
      pizzaQtd++;
      getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;
    });

    getElement('.pizzaInfo--addButton').addEventListener('click', () => {
      let size = parseInt(getElement('.pizzaInfo--size.selected').getAttribute('data-key'));

      let identifier = pizzaJson[modalKey].id + '@' + size;
      let key = cart.findIndex((item) => item.identifier == identifier);
      if (key > -1) {
        cart[key].qt += pizzaQtd;
      } else {
        cart.push({
          identifier,
          id: pizzaJson[modalKey].id,
          size,
          qt: pizzaQtd,
        });
      }
      updateModal();
      closeModal();
    });

    getElement('.menu-openner').addEventListener('click', () => {
      if (cart.length > 0) {
        getElement('aside').style.left = '0';
      }
    });

    getElement('.menu-closer').addEventListener('click', () => {
      getElement('aside').style.left = '100vw';
    });

    getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;
  };

  const updateModal = () => {
    getElement('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
      getElement('aside').classList.add('show');
      getElement('.cart').innerHTML = '';

      let subtotal = 0;
      let total = 0;
      let desconto = 0;

      for (let i in cart) {
        let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
        subtotal += pizzaItem.price * cart[i].qt;

        let cartItem = getElement('.models .cart--item').cloneNode('true');

        let pizzaSizeName;
        switch (cart[i].size) {
          case 0:
            pizzaSizeName = '(P)';
            break;
          case 1:
            pizzaSizeName = '(M)';
            break;
          case 2:
            pizzaSizeName = '(G)';
            break;
          default:
            break;
        }

        let pizzaName = `${pizzaItem.name} ${pizzaSizeName}`;

        cartItem.querySelector('img').src = pizzaItem.img;
        cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
        cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
        cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
          if (cart[i].qt > 1) {
            cart[i].qt--;
          } else {
            cart.slice(i, 1);
          }
          updateModal();
        });
        cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
          cart[i].qt++;
          updateModal();
        });

        getElement('.cart').append(cartItem);
      }

      desconto = subtotal * 0.1;
      total = subtotal - desconto;

      getElement('.subtotal span:last-child').innerHTML = `${subtotal.toFixed(2)}`;
      getElement('.desconto span:last-child').innerHTML = `${desconto.toFixed(2)}`;
      getElement('.total span:last-child').innerHTML = `${total.toFixed(2)}`;
    } else {
      getElement('aside').classList.remove('show');
      getElement('aside').style.left = '100vw';
    }
  };

  const pizzaItem = getElement('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', showModal);
  getElement('.pizzaInfo--cancelButton').addEventListener('click', closeModal);
  getElement('.pizzaInfo--cancelMobileButton').addEventListener('click', closeModal);

  getElement('.pizza-area').append(pizzaItem);
});

// Eventos do Modal
