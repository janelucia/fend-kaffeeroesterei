import products from "./products.json";

function createProductElements() {
  const productSection = document.querySelector(".shop-products-section");

  const productElements = products.products.map((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const productLink = document.createElement("a");
    productLink.setAttribute("href", `shop/product.html?id=${product.id}`);

    const productImageWrapper = document.createElement("div");
    productImageWrapper.classList.add("product-img-wrapper");

    const productImage = document.createElement("img");
    productImage.classList.add("product-img");
    productImage.setAttribute("src", product.productImage);
    productImage.setAttribute("alt", product.altText);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productName = document.createElement("h4");
    productName.classList.add("product-name");
    const productNameText = document.createTextNode(product.productName);
    productName.appendChild(productNameText);

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    const productPriceText = document.createTextNode(product.price);
    productPrice.appendChild(productPriceText);

    const productIconWrapper = document.createElement("div");
    productIconWrapper.classList.add("product-icon-wrapper");

    const icon = (iconPath) => {
      const icon = document.createElement("img");
      icon.classList.add("product-icon");
      icon.setAttribute("src", iconPath);
      productIconWrapper.appendChild(icon);
    };

    if (product.icons) {
      product.icons.forEach((iconName) => {
        icon(products.commons.iconPaths[iconName]);
      });
    }

    productImageWrapper.appendChild(productImage);

    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productIconWrapper);

    productLink.appendChild(productImageWrapper);
    productLink.appendChild(productInfo);

    productElement.appendChild(productLink);

    return productElement;
  });

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
