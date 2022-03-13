import products from "./products.json";

const queryString = window.location.search;
console.log(queryString);

const params = new URL(document.location).searchParams;
const paramId = params.get("id");
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

  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.classList.add("dropdown-wrapper");

  const dropdownButton = document.createElement("btn");
  dropdownButton.classList.add("dropbtn");
  // const dropdownButtonText = document.createTextNode(
  //   "Wie viel Kaffee brauchst du?"
  // );

  const selectedProduct = localStorage.getItem("selectedProduct");
  const dropdownButtonText = document.createTextNode(
    selectedProduct !== null
      ? `${JSON.parse(selectedProduct).variantName} für ${
          JSON.parse(selectedProduct).variantPrice
        }€`
      : "Wie viel Kaffee brauchst du?"
  );
  const dropdownButtonArrow = document.createElement("strong");
  dropdownButtonArrow.classList.add("btn-arrow");
  // const dropdownButtonArrowImg = document.createElement("img");
  // dropdownButtonArrowImg.setAttribute("src", "../images/icons/up-arrow.svg");
  // dropdownButtonArrow.appendChild(dropdownButtonArrowImg);
  // const dropdownButtonArrowText = document.createTextNode("›");
  // dropdownButtonArrow.appendChild(dropdownButtonArrowSpan);
  // dropdownButtonArrowSpan.appendChild(dropdownButtonArrowText);

  dropdownButton.appendChild(dropdownButtonText);
  dropdownButton.appendChild(dropdownButtonArrow);

  const dropdownContentWrapper = document.createElement("div");
  dropdownContentWrapper.classList.add("dropdown-content-wrapper");

  const dropdownListItems = productArray[0].variants.map((variant) => {
    const dropdownListItemElement = document.createElement("a");
    dropdownListItemElement.addEventListener("click", () => {
      const selectedProduct = {
        id: paramId,
        variantName: variant.name,
        variantPrice: variant.price,
      };
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      dropdownButtonText.textContent = `${selectedProduct.variantName} für ${selectedProduct.variantPrice}€`;
    });
    const dropdownListItemBreak1 = document.createElement("br");
    const dropdownListItemName = document.createTextNode(variant.name);
    const dropdownListItemPrice = document.createTextNode(`${variant.price} €`);

    dropdownListItemElement.appendChild(dropdownListItemName);
    dropdownListItemElement.appendChild(dropdownListItemBreak1);
    dropdownListItemElement.appendChild(dropdownListItemPrice);

    return dropdownListItemElement;
  });

  dropdownListItems.forEach((dropdownListItem) => {
    dropdownContentWrapper.appendChild(dropdownListItem);
  });

  dropdownButton.appendChild(dropdownContentWrapper);

  dropdownWrapper.appendChild(dropdownButton);

  const shoppingCartButton = document.createElement("btn");
  shoppingCartButton.classList.add("shop-button");
  const shoppingCartButtonText = document.createTextNode("In den Warenkorb");
  shoppingCartButton.appendChild(shoppingCartButtonText);

  const productIconWrapper = document.createElement("div");
  productIconWrapper.classList.add("product-icon-wrapper-detail");

  const icons = (iconPath) => {
    const icon = document.createElement("img");
    icon.classList.add("product-icon-detail");
    icon.setAttribute("src", iconPath);
    productIconWrapper.appendChild(icon);
  };

  if (productArray[0].icons) {
    productArray[0].icons.forEach((iconName) => {
      icons(products.commons.iconPaths[iconName]);
    });
  }

  productInfo.appendChild(productName);
  productInfo.appendChild(productPrice);
  productInfo.appendChild(productSummary);
  productInfo.appendChild(dropdownWrapper);
  productInfo.appendChild(shoppingCartButton);
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

  dropdownButton.addEventListener("click", () => {
    document
      .querySelector(".dropdown-content-wrapper")
      .classList.toggle("show");
    document.querySelector(".btn-arrow").classList.toggle("btn-up");
  });

  shoppingCartButton.addEventListener("click", () => {});
}

const product = () => {
  createProductDetails();
};

export default product;
