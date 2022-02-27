import products from "./products.json";

function createProductElements() {
  const productSection = document.querySelector(".shop-products-section");
  const productContainer = document.createElement("div");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const productImage = document.createElement("img");
    productImage.classList.add("product-img");
    productImage.setAttribute("src", product.productImage);
    productImage.setAttribute( "alt", product.altText);

    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    const productName = document.createElement("h4");
    productName.classList.add("product-title");
    const productNameText = document.createTextNode(product.productName);
    productName.appendChild(productNameText);

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    const productPriceText = document.createTextNode(product.price);
    productPrice.appendChild(productPriceText);

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);

    productElement.appendChild(productImage);
    productElement.appendChild(productInfo);

    productContainer.appendChild(productElement);
  });

  productSection.appendChild(productContainer);
}

const shop = () => {
  console.log("wir sind auf der shop Seite");
  console.log(products);
  createProductElements();
};

export default shop;
