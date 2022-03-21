let templateString = `
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
`;

export default Handlebars.compile(templateString);
