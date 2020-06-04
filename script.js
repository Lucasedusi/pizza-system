const MyDocument = (element) => document.querySelector(element);
const MyDocumentAll = (element) => document.querySelectorAll(element);

pizzaJson.map((item, index) => {
  pizzaItem = MyDocument('.models .pizza-item').cloneNode(true);

  MyDocument('.pizza-area').append(pizzaItem);
});
