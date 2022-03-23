import Handlebars from "handlebars";

let templateString = `
<div class="shoppingcart-product-wrapper">
    <div class="shoppingcart-product-img-wrapper">
            <img src="{{productImg}}" alt="{{productImgAlt}}">
    </div>
    <div class="shoppingcart-product-info">
            <h3>
                {{productName}}
            </h3>
        <p>
            {{variantName}}
        </p>
        <p>
            {{variantCondition}}
        </p>
        <p>
            {{variantStatus}}
        </p>
        <h4>
            {{variantPrice}}
        </h4>
    </div>
</div>
{{#if subTotal}}
<div class="sum-div">
    <p>
        Zwischensumme
    </p>
    <p>
        {{subTotal}}
    </p>
    <p>
        Versandkosten
    </p>
    <p>
        {{shippingCost}}
    </p>
    <hr>
    <p>
        Gesamtsumme
    </p>
    <p>
        {{totalAmount}}
    </p>
</div>
{{/if}}
`;

export default Handlebars.compile(templateString);
