import products from "./products.json";
import renderProduct from "./helper";

function createProductElements() {
  const productSection = document.querySelector(".shop-products-section");

  const productElements = products.products.map((product) =>
    renderProduct(product, "list")
  );

  productElements.forEach((productElement) => {
    productSection.appendChild(productElement);
  });
}

const shop = () => {
  console.log("wir sind auf der shop Seite");
  console.log(products);
  createProductElements();
};

export default shop;
