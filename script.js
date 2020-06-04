const myDocument = (element) => document.querySelector(element);
const myDocumentAll = (element) => document.querySelectorAll(element);

const cartModal = (e) => {
  e.preventDefault();

  myDocument('.pizzaWindowArea').style.opacity = 0;
  myDocument('.pizzaWindowArea').style.display = 'flex';
  setTimeout(() => {
    myDocument('.pizzaWindowArea').style.opacity = 1;
  }, 200);
};

pizzaJson.map((item) => {
  pizzaItem = myDocument('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', cartModal);

  myDocument('.pizza-area').append(pizzaItem);
});
