const getElement = (el) => document.querySelector(el);
const getElements = (el) => document.querySelectorAll(el);

const closeModal = () => {
  getElement('.pizzaWindowArea').classList.remove('active');
};

pizzaJson.map((item, index) => {
  const showModal = (e) => {
    e.preventDefault();

    pizzaItem.setAttribute('data-key', index);

    const element = e.target;
    element.classList.add('pizza-item');
    const key = element.parentNode.getAttribute('data-key');

    getElement('.pizzaWindowBody img').src = pizzaJson[key].img;
    getElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    getElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    getElement('.pizzaInfo--size span').innerHTML = pizzaJson[key].sizes[0];
    getElement('.pizzaInfo--size span').innerHTML = pizzaJson[key].sizes[1];
    getElement('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    getElements('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex ];
    });

    getElement('.pizzaWindowArea').classList.add('active');
  };

  const pizzaItem = getElement('.models .pizza-item').cloneNode(true);

  pizzaItem.setAttribute('data-key', index);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', showModal);
  getElement('.pizzaInfo--cancelButton').addEventListener('click', closeModal);

  getElement('.pizza-area').append(pizzaItem);
});

// const item = e.target;
//   const parent = item.parentNode;
//   const modal = getElement('.pizzaWindowBody');

//   modal.querySelector('img').src = item.querySelector('img').src;
//   modal.querySelector('.pizzaInfo--actualPrice').innerHTML = parent.querySelector('.pizza-item--price').innerHTML;
//   modal.querySelector('.pizzaInfo h1').innerHTML = parent.querySelector('.pizza-item--name').innerHTML;
//   modal.querySelector('.pizzaInfo--desc').innerHTML = parent.querySelector('.pizza-item--desc').innerHTML;
