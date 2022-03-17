import shop from "./shop";
import productDetail from "./product.js";

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  if (currentPath === "/shop.html") {
    shop();
  }

  if (currentPath === "/shop/product.html") {
    productDetail();
  }
});
