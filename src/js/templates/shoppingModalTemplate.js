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
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.07129 1.36377L7.49986 7.50013M13.9284 13.6365L7.49986 7.50013M7.49986 7.50013L1.07129 13.6365M7.49986 7.50013L13.9284 1.36377" stroke="currentColor" stroke-width="2"/>
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
