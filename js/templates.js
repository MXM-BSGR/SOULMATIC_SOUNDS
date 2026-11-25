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

function getProductCardTemplate(i, indexOfProductCard, productCount) {
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
                <button type="button" id="idAddToShopingCartButton_${productCount}" class="AddToShopingCartButton" onclick="addToShopingCart(${i},${indexOfProductCard}, ${productCount})" value="${productCount}">
                    Add to Shoping Cart
                </button>
                <button type="button" id="idButton_$${indexOfProductCard}_LiveLabeled" class="ButtonLiveLabeled Hide">
                    Added $license<br>
                    $Format
                </button>
            </div>
        </article>`
}

function getShopingCartTemplate() {
    return html`
                    <div id="idMobileShopingCart" class="MobileShopingCart DesktopShopingCart">
                    <button type="button" id="idMobileDialogCloseBtn" class="MobileDialogCloseBtn"></button>
                    <h2 id="idMobileShopingCartHeading" class="MobileShopingCartHeading"> Ur Shoping Cart</h2>
                    <section id="idShopingCartCurrentContent" class="ShopingCartCurrentContent"></section>

                    <img id="idShopingCartIcon" class="ShopingCartIcon Hide" src="./assets/icons/shoping-trolley.svg"
                        alt="shoping cart icon">

                    <table id="idShopingCartPriceCalculation" class="ShopingCartPriceCalculation">
                        <tr id="idSubTotalData" class="ShopingCartTableRow">
                            <th id="idTableHeading0" class="TableHeading">Subtotal</th>
                            <td id="idSubtotalPrice">x,xx €</td>
                        </tr>
                        <tr id="idDeliveryData" class="ShopingCartTableRow DeliveryCost">
                            <th id="idTableHeading1" class="TableHeading">Delevery fee</th>
                            <td id="idDeliveryPrice">x,xx €</td>
                        </tr>
                        <tr id="idPurchaseTotalSummaryData" class="ShopingCartTableRow Summary">
                            <th id="idTableHeading3" class="TableHeading">Total</th>
                            <td id="idTotalPrice">x,xx €</td>
                        </tr>
                    </table>

                    <button type="button" id="idPurchaseConfirmButton" class="PurchaseConfirmButton">
                        <b>Buy now (x,xx €)</b>
                    </button>
                </div>`
}


function getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, originalCategoryIndex, originalProductIndex) {
    return html`
        <article id="idShopingCartArticle${currentProductIndex}" class="ShopingCartArticle">
            <div id="idShopingCartArticle${currentProductIndex}Line1Wrapper" class="ShopingCartArticleLine1Wrapper">
                <p id="idShopingCartIndividualChoiseArticle${currentProductIndex}" class="ShopingCartIndividualChoise">
                    ${titleOfProduct}</p>
                <button type="button" id="idDeleteObjectOfDesire${currentProductIndex}" class="DeleteObjectOfDesire"></button>
            </div>
            <div id="idShopingCartArticle${currentProductIndex}Line2Wrapper" class="ShopingCartArticleLine2Wrapper">
                <div id="idLicenseSelectAreaWrapper${currentProductIndex}" class="LicenseSelectAreaWrapper">
                    <label for="idSelectButtons${currentProductIndex}Area1Wrapper" class="LabelSelect License">License</label>
                    <div id="idSelectButtons${currentProductIndex}Area1Wrapper" class="SelectButtonWrapper">
                        <button type="button" id="idDecreaseLicenseArticle${currentProductIndex}" class="DecreaseLicense" onclick="decreaseLicenseLevel(${currentProductIndex}), changeLicense(${currentProductIndex}), showAddedConfirmation(${currentProductIndex}), updateAddedButtonContent(${currentProductIndex})"></button>
                        <p id="idCurrentLicenseLevelArticle${currentProductIndex}" class="CurrentLicenseLevel">${license}</p>
                        <button type="button" id="idIncreaseLicenseLevelArticle${currentProductIndex}"class="IncreaseLicenseLevel" onclick="increaseLicenseLevel(${currentProductIndex}), changeLicense(${currentProductIndex}), showAddedConfirmation(${currentProductIndex}), updateAddedButtonContent(${currentProductIndex})"></button>
                    </div>
                </div>
                <div id="idFormatSelectAreaWrapper${currentProductIndex}" class="FormatSelectAreaWrapper">
                    <label for="idSelectButton${currentProductIndex}Area2Wrapper" class="LabelSelect Format">Format</label>
                    <div id="idSelectButtons${currentProductIndex}Area2Wrapper" class="SelectButtonWrapper">
                        <button type="button" id="idDecreaseFormatTypeArticle${currentProductIndex}" class="DecreaseFormatType"></button>
                        <p id="idCurrentFormatTypeArticle${currentProductIndex}" class="CurrentFormatType">${format}</p>
                        <button type="button" id="idIncreaseFormatTypeArticle${currentProductIndex}" class="IncreaseFormatType"></button>
                    </div>
                </div>
                <p id="idCurrentPriceArticle${currentProductIndex}" class="CurrentPrice">${priceOfArticle} €</p>
            </div>
        </article>`
}

function getEmptyShopingCartTemplate() {
    return html`
        <p id="idEmptyShopingCartMessage" class="EmptyShopingCartMessage Hide">
            Nothing here yet. Go ahead and choose something resonateable!
        </p>
    `
}



// #endregion
// -------------------------------------------------------------

