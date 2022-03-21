import products from "./products.json";
import orderOverview from "./templates/orderOverview.js";

console.log(typeof orderOverview({ name: "jane" }));

function getProductById(id) {
  const filteredProducts = products.products.filter(
    (product) => product.id == id
  );
  if (filteredProducts.length == 0) {
    return null;
  } else if (filteredProducts.length > 1) {
    throw new Error("Produkt-Id wurde mehrfach vergeben");
  } else {
    return filteredProducts[0];
  }
}

function createProductDetails(product) {
  const productDetailSection = document.querySelector(
    ".product-detail-section"
  );

  if (product == null) {
    throw new Error(
      "Es konnte kein Produkt gefunden werden! Entweder wurde eine falsche oder keine Produkt-Id vergeben."
    );
  }

  const productImageWrapper = document.createElement("div");
  productImageWrapper.classList.add("product-img-wrapper-detail");

  const productImage = document.createElement("img");
  productImage.classList.add("product-img-detail");
  productImage.setAttribute("src", product.productImage);
  productImage.setAttribute("alt", product.altText);

  productImageWrapper.appendChild(productImage);

  const productInfo = document.createElement("div");
  productInfo.classList.add("product-info-detail");

  const productName = document.createElement("h2");
  productName.classList.add("product-name-detail");
  const productNameText = document.createTextNode(product.productName);
  productName.appendChild(productNameText);

  const productPrice = document.createElement("h4");
  productPrice.classList.add("product-price-detail");
  const productPriceText = document.createTextNode(product.price);
  productPrice.appendChild(productPriceText);

  const productSummary = document.createElement("p");
  productSummary.classList.add("product-summary-detail");
  const productSummaryText = document.createTextNode(product.summary);
  productSummary.appendChild(productSummaryText);

  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.classList.add("dropdown-wrapper");

  const dropdownButton = document.createElement("btn");
  dropdownButton.classList.add("dropbtn");

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

  const dropdownListItems = product.variants.map((variant) => {
    const dropdownListItemElement = document.createElement("a");
    dropdownListItemElement.addEventListener("click", () => {
      const selectedProduct = {
        id: product.id,
        variantName: variant.name,
        variantPrice: variant.price,
        variantStatus: variant.status,
        variantCondition: variant.condition, //could be changed if different coffee conditions get sold
      };
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      dropdownButtonText.textContent = `${selectedProduct.variantName} für ${selectedProduct.variantPrice}€`;
    });

    const dropdownListItemNameAndPrice = document.createTextNode(
      `${variant.name} für ${variant.price}€`
    );

    dropdownListItemElement.appendChild(dropdownListItemNameAndPrice);

    return dropdownListItemElement;
  });

  dropdownListItems.forEach((dropdownListItem) => {
    dropdownContentWrapper.appendChild(dropdownListItem);
  });

  dropdownButton.appendChild(dropdownContentWrapper);

  dropdownWrapper.appendChild(dropdownButton);

  const shoppingCartButtonWrapper = document.createElement("div");
  shoppingCartButtonWrapper.classList.add("shop-button-wrapper");
  const shoppingCartButton = document.createElement("btn");
  shoppingCartButton.classList.add("shop-button");
  const shoppingCartButtonText = document.createTextNode("In den Warenkorb");
  shoppingCartButton.appendChild(shoppingCartButtonText);
  shoppingCartButtonWrapper.appendChild(shoppingCartButton);

  const productIconsWrapper = document.createElement("div");
  productIconsWrapper.classList.add("product-icons-wrapper-detail");

  const icons = (icon) => {
    const productIconWrapper = document.createElement("div");
    productIconWrapper.classList.add("product-icon-wrapper-detail");
    const productIconImgWrapper = document.createElement("div");
    productIconImgWrapper.classList.add("product-icon-img-wrapper-detail");
    const iconImg = document.createElement("img");
    iconImg.classList.add("product-icon-detail");
    iconImg.setAttribute("src", icon.path);
    productIconImgWrapper.appendChild(iconImg);
    const iconDescription = document.createElement("p");
    const iconDescriptionText = document.createTextNode(icon.description);
    iconDescription.appendChild(iconDescriptionText);
    productIconWrapper.appendChild(productIconImgWrapper);
    productIconWrapper.appendChild(iconDescription);
    productIconsWrapper.appendChild(productIconWrapper);
  };

  if (product.icons) {
    product.icons.forEach((iconName) => {
      icons(products.commons.icons[iconName]);
    });
  }

  productInfo.appendChild(productName);
  productInfo.appendChild(productPrice);
  productInfo.appendChild(productSummary);
  productInfo.appendChild(dropdownWrapper);
  productInfo.appendChild(shoppingCartButtonWrapper);
  productInfo.appendChild(productIconsWrapper);

  const productDescriptionWrapper = document.createElement("div");
  productDescriptionWrapper.classList.add("product-description-wrapper");

  const productDescriptionTitle = document.createElement("h3");
  const productDescriptionTitleText = document.createTextNode("Beschreibung");
  productDescriptionTitle.appendChild(productDescriptionTitleText);

  const productDescription = document.createElement("p");
  const productDescriptionText = document.createTextNode(product.description);
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

  shoppingCartButton.addEventListener("click", () => {
    document
      .querySelector(".shopping-cart-modal")
      .classList.add("show-shopping-cart");
    document.querySelector("footer").classList.add("shop-footer");
    updateShoppingCart();
    createShoppingModal();
  });
}

function updateShoppingCart() {
  //selectedProduct aus dem LocalStorage nehmen und in selectedProduct abspeichern
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  //Prüfen ob selectedProduct im LocalStorage vorhanden ist
  if (selectedProduct == null) {
    console.log(
      "Es ist nicht möglich, den Warenkorb zu aktualisieren, wenn kein Produkt selektiert ist."
    );
    return;
  }

  //Hole ShoppingCart aus LokalStorage
  let shoppingCart = localStorage.getItem("shoppingCart");
  //Überprüfe ob ShoppingCart vorhanden ist
  if (shoppingCart == null) {
    //wenn nicht vorhanden, erstelle ein ShoppingCart (leeres Array)
    shoppingCart = [];
  } else {
    //wenn vorhanden, nutzen wir den ShoppingCart aus dem LocalStorage
    shoppingCart = JSON.parse(shoppingCart);
  }
  //shoppingCart neues selektiertes Produkt hinzufügen
  shoppingCart.push(selectedProduct);
  //shoppingCart in LocalStorage speichern
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function createShoppingModal() {
  const productsShoppingCart = document.querySelector(
    ".shopping-cart-product-section"
  );

  const localStorageShoppingCart = JSON.parse(
    localStorage.getItem("shoppingCart")
  );

  const shoppingCartProductArray = localStorageShoppingCart.map(
    (shoppingCartProduct) => ({
      product: getProductById(shoppingCartProduct.id),
      variantName: shoppingCartProduct.variantName,
      variantPrice: shoppingCartProduct.variantPrice,
      variantStatus: shoppingCartProduct.variantStatus,
      variantCondition: shoppingCartProduct.variantCondition,
    })
    //Alternative to shorthand seen above:
    // {
    //   const vName = shoppingCartProduct.variantName;
    //   const vPrice = shoppingCartProduct.variantPrice;
    //   const p = getProductById(shoppingCartProduct.id);
    //   const o = {
    //     product: p,
    //     variantName: vName,
    //     variantPrice: vPrice,
    //   };
    //   return o;
    // }
  );

  console.log(shoppingCartProductArray);

  const shoppingCartProducts = shoppingCartProductArray.map(
    (shoppingCartProduct) => {
      const productShoppingCartContent = document.createElement("div");
      const productShoppingCartImgWrapper = document.createElement("div");

      const productShoppingCartImg = document.createElement("img");
      productShoppingCartImg.setAttribute(
        "src",
        shoppingCartProduct.product.productImage
      );
      productShoppingCartImg.setAttribute(
        "alt",
        shoppingCartProduct.product.altText
      );

      const productShoppingCartInfo = document.createElement("div");

      const productShoppingCartName = document.createElement("h3");
      const productShoppingCartNameText = document.createTextNode(
        shoppingCartProduct.product.productName
      );
      productShoppingCartName.appendChild(productShoppingCartNameText);

      const productShoppingCartVariantName = document.createElement("p");
      const productShoppingCartVariantNameText = document.createTextNode(
        shoppingCartProduct.variantName
      );
      productShoppingCartVariantName.appendChild(
        productShoppingCartVariantNameText
      );

      const productShoppingCartVariantCondition = document.createElement("p");
      const productShoppingCartVariantConditionText = document.createTextNode(
        shoppingCartProduct.variantCondition
      );
      productShoppingCartVariantCondition.appendChild(
        productShoppingCartVariantConditionText
      );

      const productShoppingCartShipping = document.createElement("p");
      const productShoppingCartShippingText = document.createTextNode(
        shoppingCartProduct.variantStatus
      );
      productShoppingCartShipping.appendChild(productShoppingCartShippingText);

      const productShoppingCartPrice = document.createElement("h4");
      const productShoppingCartPriceText = document.createTextNode(
        shoppingCartProduct.variantPrice
      );
      productShoppingCartPrice.appendChild(productShoppingCartPriceText);

      productShoppingCartImgWrapper.appendChild(productShoppingCartImg);

      productShoppingCartInfo.appendChild(productShoppingCartName);
      productShoppingCartInfo.appendChild(productShoppingCartVariantName);
      productShoppingCartInfo.appendChild(productShoppingCartVariantCondition);
      productShoppingCartInfo.appendChild(productShoppingCartShipping);
      productShoppingCartInfo.appendChild(productShoppingCartPrice);

      productShoppingCartContent.appendChild(productShoppingCartImgWrapper);
      productShoppingCartContent.appendChild(productShoppingCartInfo);

      return productShoppingCartContent;
    }
  );

  shoppingCartProducts.forEach((shoppingCartProduct) => {
    productsShoppingCart.appendChild(shoppingCartProduct);
  });

  const orderOverviewSection = document.querySelector(
    ".order-overview-section"
  );

  const createOrderOverview = () => {
    const subTotalCost = shoppingCartProductArray
      .map((shoppingCartProduct) => shoppingCartProduct.variantPrice)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const shippingCost = 3.9;
    const totalAmountCost = subTotalCost + shippingCost;

    const orderOverviewTemplate = orderOverview({
      subTotal: subTotalCost,
      shippingCost: shippingCost,
      totalAmount: totalAmountCost,
    });

    return orderOverviewTemplate;
  };
  orderOverviewSection.innerHTML = createOrderOverview();
}

const closeBurgerMenu = document.querySelector(".burger-menu-close");

function clickhandler() {
  document
    .querySelector(".shopping-cart-modal")
    .classList.remove("show-shopping-cart");
  document.querySelector("footer").classList.remove("shop-footer");
}
closeBurgerMenu.addEventListener("click", clickhandler);

const productDetail = () => {
  const params = new URL(document.location).searchParams;
  const paramId = params.get("id");
  createProductDetails(getProductById(paramId));
};

export default productDetail;
