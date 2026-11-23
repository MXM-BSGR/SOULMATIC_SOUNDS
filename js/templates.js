// ==============================================================
// TEMPLATE FUNCTIONS
// ==============================================================
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

// Konstante und Arrow-Function werden für die Erweiterung "lit-html" benötigt
// (ermöglicht HTML-Formatierung, Syntax-Highlighting und Autovervollständigung in JS-Dateien).
// Ohne diese Definition würde das "html"-Tag vor den Backticks einen ReferenceError auslösen.



//#region BLANCO

function getCategoryTemplate(i) {
    return html`
        <div id="idCategoryCardWrapper" class="CategoryCardWrapper">
            <header id="idProductCategory_${i}_Heading" class="ProductCategoryHeading">
                <h2 id="idCategory_${i}_Name" class="CategoryName">
                    ${loopCatalog[i].category}
                </h2>
                <img id="idCategory_${i}_Icon" class="Category_${i}_Icon" src="./assets/icons/beatdown.svg" alt="alt">

            </header>

            <div id="idProductCardsWrapper" class="ProductCardsWrapper">
                <p>${loopCatalog[i].category}</p>
                <!-- getArticleTemplate(${i}); -->

            </div>
        </div>`
}

function getProductCardTemplate(i) {

    return html`
        <article id="idProductCard0" class="ProductCard">
            <button type="button" id="idProductCard0PreviewWrapper" class="ProductCardPreviewWrapper">
                <img id="idProductCard0ImagePlayButtonOverlay" class="ProductCardImagePlayButtonOverlay" src="./assets/icons/play-button.svg" alt="play">
            </button>
            <div id="idProductCard0DescriptionWrapper" class="ProductCardDescriptionWrapper">
                <h3 id="idProduct0Name" class="ProductName">Concrete Breakdown Riff (Drop A)</h3>
                <p id="idProduct0Content" class="ProductContent">
                    2x Ping Snare One-Shots,
                    1x Sub-Drop 808 Boom,
                    1x Chug Guitar Stems (DI & Amped)
                </p>
            </div>
            <div id="idProductCard0PurchaseWrapper" class="ProductCardPurchaseWrapper">
                <p id="idProduct0Price" class="ProductPrice">
                    <b>12.90 €</b>
                </p>
                <button type="button" id="idAdd0ToShopingCartButton0" class="AddToShopingCartButton">
                    Add to Shoping Cart
                </button>
                <button type="button" id="idButtonLiveLabeled" class="ButtonLiveLabeled Hide">
                    Added $license<br>
                    $Format
                </button>
            </div>
        </article>`
}



// #endregion
// -------------------------------------------------------------

