let pizzaQtd = 1;
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
    const key = element.parentNode.getAttribute('data-key');
    pizzaQtd = 1;

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

    // Método Mais pizza
    const maisPizza = () => {
      pizzaQtd++;
      getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;
    };

    // Método Menos pizza
    const menosPizza = () => {
      if (pizzaQtd > 1) {
        pizzaQtd--;
        getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;
      }
    };

    getElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.addEventListener('click', () => {
        getElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
      });
    });
    getElement('.pizzaInfo--qtmenos').addEventListener('click', menosPizza);
    getElement('.pizzaInfo--qtmais').addEventListener('click', maisPizza);

    getElement('.pizzaInfo--qt').innerHTML = pizzaQtd;

    getElement('.pizzaWindowArea').classList.add('active');
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
