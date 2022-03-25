import products from "./products.json";
import productTemplate from "./templates/productTemplate.js";
import shoppingModalTemplate from "./templates/shoppingModalTemplate.js";

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

  const selectedProductJSON = localStorage.getItem("selectedProduct");

  const selectedProduct =
    selectedProductJSON && JSON.parse(selectedProductJSON);

  function labelText(selectedProduct) {
    return selectedProduct !== null
      ? //gesucht wird nach dem Index im JSON - deshalb muss die variantId === Index des Variantenarrays sein.
        `${product.variants[selectedProduct.variantId].name} für ${
          product.variants[selectedProduct.variantId].price
        }€`
      : "Wie viel Kaffee brauchst du?";
  }

  const productDetailTemplate = productTemplate({
    productImg: product.productImage,
    productImgAlt: product.altText,
    productName: product.productName,
    productPrice: product.price,
    summary: product.summary,
    productDescription: product.description,
    variants: product.variants,
    variation: labelText(selectedProduct),
    iconImg: product.icons,
  });

  productDetailSection.innerHTML = productDetailTemplate;

  // const dropdownContentWrapper = document.querySelector(
  //   ".dropdown-content-wrapper"
  // );

  const variantsButtons = document.querySelectorAll(".variant-button");
  variantsButtons.forEach((variantButton) => {
    variantButton.addEventListener("click", () => {
      const selectedProduct = {
        id: product.id,
        variantId: parseInt(variantButton.getAttribute("data-id")),
      };
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      const dropdownButtonText = document.querySelector(".variation-wrapper");
      dropdownButtonText.textContent = labelText(selectedProduct);
    });
  });

  // const dropdownListItems = product.variants.forEach((variant) => {
  //   dropdownListItemElement.addEventListener("click", (event) => {
  //     const selectedVariantId = event.target.dataset.id;
  //     const selectedVariant = product.variants.find();
  //     const selectedProduct = {
  //       id: product.id,
  //       variantName: variant.name,
  //       variantPrice: variant.price,
  //       variantStatus: variant.status,
  //       variantCondition: variant.condition, //could be changed if different coffee conditions get sold
  //     };
  //     localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  //     const dropdownButtonText = document.querySelector(".variation-wrapper");
  //     dropdownButtonText.textContent = `${selectedProduct.variantName} für ${selectedProduct.variantPrice}€`;
  //   });
  // });

  // const dropdownListItems = product.variants.map((variant) => {
  //   const dropdownListItemElement = document.createElement("button");
  // dropdownListItemElement.addEventListener("click", (event) => {
  //   const selectedVariantId = event.target.dataset.id;
  //   const selectedVariant = product.variants.find()
  //   this.dataset.id
  //   const selectedProduct = {
  //     id: product.id,
  //     variantName: variant.name,
  //     variantPrice: variant.price,
  //     variantStatus: variant.status,
  //     variantCondition: variant.condition, //could be changed if different coffee conditions get sold
  //   };
  //     localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
  //     const dropdownButtonText = document.querySelector(".variation-wrapper");
  //     dropdownButtonText.textContent = `${selectedProduct.variantName} für ${selectedProduct.variantPrice}€`;
  //   });

  //   const dropdownListItemNameAndPrice = document.createTextNode(
  //     `${variant.name} für ${variant.price}€`
  //   );

  //   console.log(dropdownListItemNameAndPrice);

  //   dropdownListItemElement.appendChild(dropdownListItemNameAndPrice);

  //   return dropdownListItemElement;
  // });

  // dropdownListItems.forEach((dropdownListItem) => {
  //   dropdownContentWrapper.appendChild(dropdownListItem);
  // });

  // const shoppingCartButtonWrapper = document.createElement("div");
  // shoppingCartButtonWrapper.classList.add("shop-button-wrapper");
  // const shoppingCartButton = document.createElement("btn");
  // shoppingCartButton.classList.add("shop-button");
  // const shoppingCartButtonText = document.createTextNode("In den Warenkorb");
  // shoppingCartButton.appendChild(shoppingCartButtonText);
  // shoppingCartButtonWrapper.appendChild(shoppingCartButton);

  // const productIconsWrapper = document.createElement("div");
  // productIconsWrapper.classList.add("product-icons-wrapper-detail");

  // const icons = (icon) => {
  //   const productIconWrapper = document.querySelectorAll(
  //     ".product-icon-wrapper-detail"
  //   );
  //   const productIconImgWrapper = document.querySelectorAll(
  //     ".product-icon-img-wrapper-detail"
  //   );
  //   const iconImg = document.createElement("img");
  //   iconImg.classList.add("product-icon-detail");
  //   iconImg.setAttribute("src", icon.path);
  //   productIconImgWrapper.appendChild(iconImg);
  //   const iconDescription = document.createElement("p");
  //   const iconDescriptionText = document.createTextNode(icon.description);
  //   iconDescription.appendChild(iconDescriptionText);
  //   productIconWrapper.appendChild(productIconImgWrapper);
  //   productIconWrapper.appendChild(iconDescription);
  // };

  // if (product.icons) {
  //   product.icons.forEach((iconName) => {
  //     icons(products.commons.icons[iconName]);
  //   });
  // }

  const dropdownButton = document.querySelector(".dropbtn");
  const dropdownContentWrapper = document.querySelector(
    ".dropdown-content-wrapper"
  );
  const btnArrow = document.querySelector(".btn-arrow");
  dropdownButton.addEventListener("click", () => {
    dropdownContentWrapper.classList.toggle("show");
    btnArrow.classList.toggle("btn-up");
  });

  const shoppingCartButton = document.querySelector(".shop-button");
  const shoppingCartModal = document.querySelector(".shopping-cart-modal");
  const footer = document.querySelector("footer");
  shoppingCartButton.addEventListener("click", () => {
    shoppingCartModal.classList.add("show-shopping-cart");
    footer.classList.add("shop-footer");
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
  const updatedShoppingCart = [...shoppingCart, selectedProduct];
  //shoppingCart.push(selectedProduct); - nicht verwenden! Da dadurch das Array manipuliert wird und man dadurch unerklärliche Bugs reinholen kann. - immutability
  //shoppingCart in LocalStorage speichern
  localStorage.setItem("shoppingCart", JSON.stringify(updatedShoppingCart));
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
      variantId: shoppingCartProduct.variantId,
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

  const shoppingCartProducts = shoppingCartProductArray.map(
    (shoppingCartProduct) => {
      const variant =
        shoppingCartProduct.product.variants[shoppingCartProduct.variantId];
      return shoppingModalTemplate({
        productImg: shoppingCartProduct.product.productImage,
        productImgAlt: shoppingCartProduct.product.altText,
        productName: shoppingCartProduct.product.productName,
        variantName: variant.name,
        variantCondition: variant.condition,
        variantStatus: variant.status,
        variantPrice: variant.price,
      });
    }
  );

  productsShoppingCart.innerHTML = shoppingCartProducts.join("");
  const childProductsShoppingCart = productsShoppingCart.querySelectorAll(
    ".shoppingcart-product-wrapper"
  );

  childProductsShoppingCart.forEach((shoppingCartProduct, index) => {
    const removeButton = shoppingCartProduct.querySelector(
      ".shoppingcart-product-info svg"
    );
    removeButton.addEventListener("click", () => {
      //TODO: don't mutate localStorageShoppingCart
      localStorageShoppingCart.splice(index, 1, null);
      console.log(localStorageShoppingCart);
      localStorage.setItem(
        "shoppingCart",
        JSON.stringify(
          localStorageShoppingCart.filter(
            (localStorageShoppingCartElement) =>
              localStorageShoppingCartElement !== null
          )
        )
      );
      shoppingCartProduct.remove();
    });
  });

  // shoppingCartProducts.forEach((shoppingCartProduct) => {
  //   productsShoppingCart.innerHTML = shoppingCartProducts;
  // });

  const orderOverviewSection = document.querySelector(
    ".order-overview-section"
  );

  const createOrderOverview = () => {
    const subTotalCost = shoppingCartProductArray
      .map((shoppingCartProduct) => shoppingCartProduct.variantPrice)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    const shippingCost = 3.9;
    const totalAmountCost = subTotalCost + shippingCost;

    const orderOverviewTemplate = shoppingModalTemplate({
      subTotal: subTotalCost,
      shippingCost: shippingCost,
      totalAmount: totalAmountCost,
    });

    return orderOverviewTemplate;
  };
  orderOverviewSection.innerHTML = createOrderOverview();
}

const closeBurgerMenu = document.querySelector(".burger-menu-close");

//TODO - auch hier den querySelector als Konstante speichern
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
