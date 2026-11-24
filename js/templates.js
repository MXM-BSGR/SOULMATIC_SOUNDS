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
        <div id="idCategory_${i}_CardWrapper" class="CategoryCardWrapper">
            <header id="idProductCategory_${i}_Heading" class="ProductCategoryHeading">
                <h2 id="idCategory_${i}_Name" class="CategoryName">
                    ${loopCatalog[i].category}
                </h2>
                <div id="idIcon_${i}_Wrapper" class="IconWrapper">
                    <img id="idCategory_${i}_Icon" class="Category_${i}_Icon" src="${loopCatalog[i].iconPath}" alt="alt">
                </div>
            </header>
            <div id="idProductCardsCategory_${i}_Wrapper" class="ProductCardsWrapper">
            </div>
        </div>`
}

function getProductCardTemplate(i, indexOfProductCard, productCounter) {
    return html`
        <article id="idProductCard${indexOfProductCard}" class="ProductCard">
            <button type="button" id="idProductCard_$${indexOfProductCard}_PreviewWrapper" class="ProductCardPreviewWrapper">
                <img id="idProductCard_$${indexOfProductCard}_ImagePlayButtonOverlay" class="ProductCardImagePlayButtonOverlay" src="./assets/icons/play-button.svg" alt="play">
            </button>
            <div id="idProductCard_$${indexOfProductCard}_DescriptionWrapper" class="ProductCardDescriptionWrapper">
                <h3 id="idProduct_$${indexOfProductCard}_Name" class="ProductName">${loopCatalog[i].loops[indexOfProductCard].title}</h3>
                <p id="idProduct_${indexOfProductCard}_Content" class="ProductContent">
                    ${loopCatalog[i].loops[indexOfProductCard].includedSamples.join(", ")}
                </p>
            </div>
            <div id="idProductCard_$${indexOfProductCard}_PurchaseWrapper" class="ProductCardPurchaseWrapper">
                <p id="idProduct_$${indexOfProductCard}_Price" class="ProductPrice">
                    <b>12.90 €</b>
                </p>
                <button type="button" id="idAddToShopingCartButton_${indexOfProductCard}" class="AddToShopingCartButton" onclick="addToShopingCart(${i},${indexOfProductCard})" value="${productCounter}">
                    Add to Shoping Cart
                </button>
                <button type="button" id="idButton_$${indexOfProductCard}_LiveLabeled" class="ButtonLiveLabeled Hide">
                    Added $license<br>
                    $Format
                </button>
            </div>
        </article>`
}



// #endregion
// -------------------------------------------------------------

