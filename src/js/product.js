import products from "./products.json";

const queryString = window.location.search;
console.log(queryString);

let params = new URL(document.location).searchParams;
let paramId = params.get("id");
console.log(paramId);

function createProductDetails() {
  const productDetailSection = document.querySelector(
    ".product-detail-section"
  );

  const productArray = products.products.filter(
    (product) => product.id == paramId
  );

  if (productArray.length > 1) {
    console.log("FEHLER: ID mehrfach vergeben");
  }

  console.log(productArray);

  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-img-wrapper-detail");

  const productImage = document.createElement("img");
  productImage.classList.add("product-img-detail");
  productImage.setAttribute("src", productArray[0].productImage);
  productImage.setAttribute("alt", productArray[0].altText);

  productImageWrapper.appendChild(productImage);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info-detail");

  const productName = document.createElement("h2");
  productName.classList.add("product-name-detail");
  const productNameText = document.createTextNode(productArray[0].productName);
  productName.appendChild(productNameText);

  const productPrice = document.createElement("p");
  productPrice.classList.add("product-price-detail");
  const productPriceText = document.createTextNode(productArray[0].price);
  productPrice.appendChild(productPriceText);

  const productSummary = document.createElement("p");
  productSummary.classList.add("product-summary-detail");
  const productSummaryText = document.createTextNode(productArray[0].summary);
  productSummary.appendChild(productSummaryText);

  const productIconWrapper = document.createElement("div");
  productIconWrapper.classList.add("product-icon-wrapper-detail");

  const icon = (iconPath) => {
    const icon = document.createElement("img");
    icon.classList.add("product-icon-detail");
    icon.setAttribute("src", iconPath);
    productIconWrapper.appendChild(icon);
  };

  if (productArray[0].icons) {
    productArray[0].icons.forEach((iconName) => {
      icon(products.commons.iconPaths[iconName]);
    });
  }

  productInfo.appendChild(productName);
  productInfo.appendChild(productPrice);
  productInfo.appendChild(productSummary);
  productInfo.appendChild(productIconWrapper);

  const productDescriptionWrapper = document.createElement("div");
  productDescriptionWrapper.classList.add("product-description-wrapper");

  const productDescriptionTitle = document.createElement("h3");
  const productDescriptionTitleText = document.createTextNode("Beschreibung");
  productDescriptionTitle.appendChild(productDescriptionTitleText);

  const productDescription = document.createElement("p");
  const productDescriptionText = document.createTextNode(
    productArray[0].description
  );
  productDescription.appendChild(productDescriptionText);

  productDescriptionWrapper.appendChild(productDescriptionTitle);
  productDescriptionWrapper.appendChild(productDescription);

  productDetailSection.appendChild(productImageWrapper);
  productDetailSection.appendChild(productInfo);
  productDetailSection.appendChild(productDescriptionWrapper);
}

const product = () => {
  createProductDetails();
};

export default product;
