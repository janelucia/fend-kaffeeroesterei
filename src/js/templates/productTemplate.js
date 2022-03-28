import Handlebars from "handlebars";

let templateString = `
<div class="product-img-wrapper-detail">
    <img class="product-img-detail" src="{{productImg}}" alt="{{productImgAlt}}">
</div>
<div class="product-info-detail">
    <h2 class="product-name-detail">
        {{productName}}
    </h2>
    <h4 class="product-price-detail">
        {{productPrice}}
    </h4>
    <p class="product-summary-detail">
        {{summary}}
    </p>
    <div class="dropdown-wrapper">
        <button class="dropbtn">
            <div class="variation-wrapper">
            {{variation}}
            </div>
            <strong class="btn-arrow">
            </strong>
        </button>
        <div class="dropdown-content-wrapper">
            {{#each variant}}
                 
                <button class="variant-button" data-id="{{this.variantId}}">{{this.name}} für {{this.price}}€</button>
               
            {{/each}}
        </div>
    </div>
    <div class="shop-button-wrapper">
        <button class="shop-button">
            In den Warenkorb
        </button>
    </div>
    <div class="product-icons-wrapper-detail">
        {{#each icon}}
            <div class="product-icon-wrapper-detail">
                <div class="product-icon-img-wrapper-detail">
                    <img class="product-icon-detail" src="{{this.path}}" alt="{{this.alt}}">
                </div>
                <p>
                    {{this.description}}
                </p>
            </div>
        {{/each}}
    </div>
</div>
<div class="product-description-wrapper">
    <h3>
        Beschreibung
    </h3>
    <p>
        {{productDescription}}
    </p>
</div>
`;

export default Handlebars.compile(templateString);
