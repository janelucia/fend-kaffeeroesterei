import shop from "./shop";

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath === '/shop.html') {
        shop();
    };    
});
