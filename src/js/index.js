import shop from "./shop";
import product from "./product.js";

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/shop.html') {
        shop();
    };
    
    if (currentPath === '/shop/product.html') {
        product();
    }
});
