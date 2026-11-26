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
        <article id="idProductCard${productCounter}" class="ProductCard">
            <button type="button" id="idProductCard_${productCounter}_PreviewWrapper" class="ProductCardPreviewWrapper ProductCard_${productCounter}_PreviewWrapper">
                <img id="idProductCard_${productCounter}_ImagePlayButtonOverlay" class="ProductCardImagePlayButtonOverlay" src="./assets/icons/play-button.svg" alt="play">
            </button>
            <div id="idProductCard_${productCounter}_DescriptionWrapper" class="ProductCardDescriptionWrapper">
                <h3 id="idProduct_${productCounter}_Name" class="ProductName">${loopCatalog[i].loops[indexOfProductCard].title}</h3>
                <p id="idProduct_${productCounter}_Content" class="ProductContent">
                    ${loopCatalog[i].loops[indexOfProductCard].includedSamples.join(", ")}
                </p>
            </div>
            <div id="idProductCard_${productCounter}_PurchaseWrapper" class="ProductCardPurchaseWrapper">
                <p id="idProduct_${productCounter}_Price" class="ProductPrice">
                    <b>${loopCatalog[i].loops[indexOfProductCard].price.toFixed(2)} €</b>
                </p>
                <button type="button" id="idAddToShopingCartButton_${productCounter}" class="AddToShopingCartButton" onclick="addToShopingCart(${i},${indexOfProductCard}, ${productCounter})" value="${productCounter}" data-condition= "unadded">
                    Add to Shoping Cart
                </button>
            </div>
        </article>`
}

function getShopingCartTemplate() {
    return html`
        <div id="idMobileShopingCart" class="MobileShopingCart DesktopShopingCart Hide">
            <button type="button" id="idMobileDialogCloseBtn" class="MobileDialogCloseBtn" onclick="closeShopingCart()"></button>
            <h2 id="idMobileShopingCartHeading" class="MobileShopingCartHeading"> Ur Shoping Cart</h2>
            <section id="idShopingCartCurrentContent" class="ShopingCartCurrentContent"></section>

            <img id="idShopingCartIcon" class="ShopingCartIcon Hide" src="./assets/icons/shoping-trolley.svg"
                alt="shoping cart icon">
            <div>
                <label>Choose:</label>
                <button type="button">Instant Download</button>
                <button type="button">Hardware</button>
            </div>

            <table id="idShopingCartPriceCalculation" class="ShopingCartPriceCalculation">
                <tr id="idSubTotalData" class="Hide">
                    <th id="idTableHeading0" class="TableHeading">Subtotal</th>
                    <td id="idSubtotalPrice">x,xx €</td>
                </tr>
                <tr id="idDeliveryData" class="Hide">
                    <th id="idTableHeading1" class="TableHeading">Delevery fee</th>
                    <td id="idDeliveryPrice">x,xx €</td>
                </tr>
                <tr id="idPurchaseTotalSummaryData" class="ShopingCartTableRow Summary">
                    <th id="idTableHeading3" class="TableHeading">Total</th>
                    <td id="idTotalPrice">x,xx €</td>
                </tr>
            </table>

            <button type="button" id="idPurchaseConfirmButton" class="PurchaseConfirmButton" onclick="renderOrderConfirmationModal()">
                <b>Buy now (x,xx €)</b>
            </button>
        </div>`
}


function getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, productCounter, originalCategoryIndex, originalProductIndex) {
    return html`
        <article id="idShopingCartArticle${currentProductIndex}" class="ShopingCartArticle">
            <div id="idShopingCartArticle${currentProductIndex}Line1Wrapper" class="ShopingCartArticleLine1Wrapper">
                <p id="idShopingCartIndividualChoiseArticle${currentProductIndex}" class="ShopingCartIndividualChoise">
                    ${titleOfProduct}</p>
                <button type="button" id="idDeleteObjectOfDesire${currentProductIndex}" class="DeleteObjectOfDesire" onclick="deleteObjectOfDesire(${currentProductIndex}), updatePriceOnWebsite(${productCounter},${originalCategoryIndex}, ${originalProductIndex})"></button>
            </div>
            <div id="idShopingCartArticle${currentProductIndex}Line2Wrapper" class="ShopingCartArticleLine2Wrapper">
                <div id="idLicenseSelectAreaWrapper${currentProductIndex}" class="LicenseSelectAreaWrapper">
                    <label for="idSelectButtons${currentProductIndex}Area1Wrapper" class="LabelSelect License">License</label>
                    <div id="idSelectButtons${currentProductIndex}Area1Wrapper" class="SelectButtonWrapper">
                        <button type="button" id="idDecreaseLicenseArticle${currentProductIndex}" class="DecreaseLicense" onclick="decreaseArticlePrice(${currentProductIndex}), decreaseLicense(${currentProductIndex}), updatePriceOnWebsite(${productCounter}, ${currentProductIndex}"></button>
                        <p id="idCurrentLicenseLevelArticle${currentProductIndex}" class="CurrentLicenseLevel">${license}</p>
                        <button type="button" id="idIncreaseLicenseLevelArticle${currentProductIndex}"class="IncreaseLicenseLevel" onclick="increaseLicense(${currentProductIndex}), increaseArticlePrice(${currentProductIndex}), updatePriceOnWebsite(${productCounter}, ${currentProductIndex})"></button>
                    </div>
                </div>
                <div id="idFormatSelectAreaWrapper${currentProductIndex}" class="FormatSelectAreaWrapper">
                    <label for="idSelectButton${currentProductIndex}Area2Wrapper" class="LabelSelect Format">Format</label>
                    <div id="idSelectButtons${currentProductIndex}Area2Wrapper" class="SelectButtonWrapper">
                        <button type="button" id="idDecreaseFormatTypeArticle${currentProductIndex}" class="DecreaseFormatType" onclick="decreaseArticlePrice(${currentProductIndex}), decreaseFormat(${currentProductIndex}), updatePriceOnWebsite(${productCounter}, ${currentProductIndex})"></button>
                        <p id="idCurrentFormatTypeArticle${currentProductIndex}" class="CurrentFormatType">${format}</p>
                        <button type="button" id="idIncreaseFormatTypeArticle${currentProductIndex}" class="IncreaseFormatType" onclick="increaseFormat(${currentProductIndex}), increaseArticlePrice(${currentProductIndex}), updatePriceOnWebsite(${productCounter}, ${currentProductIndex})"></button>
                    </div>
                </div>
                <p id="idCurrentPriceArticle${currentProductIndex}" class="CurrentPrice">${Number(priceOfArticle).toFixed(2)} €</p>
            </div>
        </article>`
}

function getEmptyShopingCartTemplate() {
    return html`
        <div id="idMobileShopingCart" class="MobileShopingCart EmptyShopingCartInnerContent">
            <button type="button" id="idMobileDialogCloseBtn" class="MobileDialogCloseBtn" onclick="closeShopingCart()"></button>
            <h2 id="idMobileShopingCartHeading" class="MobileShopingCartHeading"> Ur Shoping Cart</h2>
            <section id="idShopingCartCurrentContent" class="EmptyShopingCartCurrentContent">
                <p id="idEmptyShopingCartMessage" class="EmptyShopingCartMessage">
                    Nothing here yet. Go ahead and choose something resonateable!
                </p>
                <img src="./assets/icons/shoping-trolley.svg" class="EmptyShopingCartIcon" alt="shoping trolley icon">
            </section>
        </div>
    `
}


function getOrderConfirmationModalTemplate() {
    return html`
    <dialog id="idSentConfirmationModal" class="SentConfirmationModal" onclick="closeOrderConfirmationModal()">
      <div class="ConfirmationModalContent" onclick="eventprevention(event)">
        <button type="button" id="idConfirmationModalCloseButton" class="ConfirmationModalCloseButton" onclick="closeOrderConfirmationModal()"></button>
        <img id="idDownloadQRCode" class="DownloadQRCode" src="./assets/icons/qr-code.svg" alt="mail sent icon">
        <h2 id="idConfirmationModalHeading" class="ConfirmationModalHeading">Order confirmed!</h2>
        <p id="idConfirmationModalSubheading" class="ConfirmationModalSubheading">Download via QR-Code<br>
          <span id="idConfirmationInfoDivider" class="ConfirmationInfoDivider">or</span><br>
          check your email, we sent you a Download-Link!
        </p>
        <img id="idMailSentIcon" class="MailSentIcon" src="./assets/icons/marked-email.svg" alt="mail sent icon"><br>
      </div>
    </dialog>
  `;
}




// #endregion
// -------------------------------------------------------------

