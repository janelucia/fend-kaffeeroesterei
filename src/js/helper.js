import products from "./products.json";

function renderProduct(product, type) {
  const productElement = document.createElement("div");
  productElement.classList.add(`product-${type}`);

  if (type === "list") {
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

    const icon = (icon) => {
      const iconImg = document.createElement("img");
      iconImg.classList.add("product-icon");
      iconImg.setAttribute("src", icon.path);
      productIconWrapper.appendChild(iconImg);
    };

    if (product.icons) {
      product.icons.forEach((iconName) => {
        icon(products.commons.icons[iconName]);
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
  }
}

export default renderProduct;
