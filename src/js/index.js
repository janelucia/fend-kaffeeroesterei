import shop from "./shop";
// import detailShop from "./detail-shop.js";

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/shop.html') {
        shop();
    };    
});

const queryString = window.location.search;
console.log(queryString);
