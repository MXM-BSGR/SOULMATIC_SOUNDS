// ==============================================================
// SCRIPT*/
// ==============================================================


// #region   CONST


// #endregion
// -------------------------------------------------------------
// ==============================================================


// #region   FUNCTIONS

function init() {
    renderProducts();
    updateShopingCartBadge();
}

function renderProducts() {
    const ALL_CATEGORIES_REF = document.getElementById("idAllCategories");
    let productCounter = 0;
    ALL_CATEGORIES_REF.innerHTML = "";

    for (let i = 0; i < loopCatalog.length; i++) {
        ALL_CATEGORIES_REF.innerHTML += getCategoryTemplate(i);
        productCounter = renderProductCards(i, productCounter);
    }
}

function renderProductCards(i, productCounter) {
    let productCardsWrapperRef = document.getElementById(`idProductCardsCategory_${i}_Wrapper`);

    for (let indexOfProductCard = 0; indexOfProductCard < loopCatalog[i].loops.length; indexOfProductCard++) {
        productCardsWrapperRef.innerHTML += getProductCardTemplate(i, indexOfProductCard, productCounter);
        productCounter++;
    }
    return productCounter;
}



// function renderProductContent(i, indexOfProductCard) {
//     const PRODUCT_CONTENT_REF = document.getElementById("idProduct_${indexOfProductCard}_Content");

//     let pathToContent = "loopCatalog[i].loops[indexOfProductCard].includedSamples";

//     for (let currentContentIndex = 0; currentContentIndex > pathToContent.length; currentContentIndex++) {
//         console.log(loopCatalog[i].loops[indexOfProductCard].includedSamples.length);
//     }
// }

// #region SHOPING CART

function addToShopingCart(i, indexOfProductCard, productCounter) {
    const BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${productCounter}`);
    if (BUTTON_REF.dataset.condition == "added") {
        return;
    }
    else {
        let categoryIndex = i;
        let productIndex = getProductIndex(indexOfProductCard);
        let productsInShopingCart = shopingCart[1].objectsOfDesire.length;
        let productInformationRef = loopCatalog[categoryIndex].loops[productIndex];
        let titleOfProduct = productInformationRef.title;
        let licenseTypeOfProduct = productInformationRef.defaultLicense;
        let formatTypeOfProduct = productInformationRef.defaultFormat;
        let priceOfProduct = productInformationRef.price.toFixed(2);
        let productData = {
            // [`product_${productsInShopingCart}_InShopingCart`]: {

            "title": titleOfProduct,
            "licenceType": licenseTypeOfProduct,
            "audioFormat": formatTypeOfProduct,
            "price": priceOfProduct,
            "position": [i, indexOfProductCard],
            "productCounter": productCounter
            // }
        };
        BUTTON_REF.dataset.condition = "added";
        shopingCart[1].objectsOfDesire.push(productData);
        console.log(shopingCart[1].objectsOfDesire);
        // renderShopingCart(productCounter);
        renderShopingCart(i, indexOfProductCard);

        showAddedConfirmation(i, indexOfProductCard, productCounter, productsInShopingCart);
        calculateSubTotalPrice();
        calculateTotalPrice();
        updateShopingCartBadge();
        // console.log(titleOfProduct);
        // infoForShopingCart.push(titleOfProduct);
        // console.log(infoForShopingCart);
    }
};

function showAddedConfirmation(i, indexOfProductCard, productCounter, currentProductIndexInShopingCart) {
    const BUTTON_OF_PRODUCT = document.getElementById(`idAddToShopingCartButton_${productCounter}`);

    let currentLicenseIndex = getActualLicenseType(currentProductIndexInShopingCart);
    let currentFormatIndex = getActualFormatType(currentProductIndexInShopingCart);
    // BUTTON_OF_PRODUCT.innerHTML = "free/mp3 Added";
    BUTTON_OF_PRODUCT.innerHTML = `${AUDIO_FORMATS[currentFormatIndex].formatKey}/ ${LICENSES[currentLicenseIndex].licenseKey} ADDED`;




}

function getActualLicenseType(indexOfProductCard) {
    switch (shopingCart[1].objectsOfDesire[indexOfProductCard].licenceType) {
        case "free":
            return 0;
        case "basic":
            return 1;
        case "pro":
            return 2;
        case "exclusive":
            return 3;
    }
}

function getActualFormatType(indexOfProductCard) {
    switch (shopingCart[1].objectsOfDesire[indexOfProductCard].audioFormat) {
        case "mp3":
            return 0;
        case "wav":
            return 1;
        case "flac":
            return 2;
        case "master":
            return 3;
    }
}

function getProductIndex(indexOfProductCard) {
    const PRODUCT_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${indexOfProductCard}`);
    // console.log(PRODUCT_BUTTON_REF.value);
    return PRODUCT_BUTTON_REF.value;
}

// function renderShopingCart(productCounter) {
function renderShopingCart(i, indexOfProductCard) {
    const PRODUCT_CATEGORYS_WRAPPER_REF = document.getElementById("idProductCategorysWrapper");
    let SHOPING_CART_REF = document.getElementById("idMobileShopingCart");

    if (SHOPING_CART_REF !== null && SHOPING_CART_REF.classList.contains("EmptyShopingCartInnerContent")) {
        SHOPING_CART_REF.remove();
        SHOPING_CART_REF = null;
    }

    if (SHOPING_CART_REF === null) {
        PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML += getShopingCartTemplate();

    }

    renderShopingCartContent(i, indexOfProductCard);
    showTotalPriceOnButton();
}

function renderShopingCartContent() {
    const SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
    SHOPING_CART_CURRENT_CONTENT_REF.innerHTML = "";
    for (let currentProductIndex = 0; currentProductIndex < shopingCart[1].objectsOfDesire.length; currentProductIndex++) {
        SHOPING_CART_CURRENT_CONTENT_REF.innerHTML += renderProductCardForShopingCart(currentProductIndex);
        // SHOPING_CART_CURRENT_CONTENT_REF.innerHTML += renderProductCardForShopingCart(currentProductIndex, productCounter);
    }
}

// function checkExistenceOfShopingCart(){
//     const SHOPINC_CART_REF = document.getElementById("idMobileShopingCart");
//     if(PRODUCT_CATEGORYS_WRAPPER_REF.contains("idMobileShopingCart")){
//         return true
//     }
// }

// function renderProductCardForShopingCart(currentProductIndex, productCounter) {
function renderProductCardForShopingCart(currentProductIndex) {
    let titleOfProduct = shopingCart[1].objectsOfDesire[currentProductIndex].title;
    let license = shopingCart[1].objectsOfDesire[currentProductIndex].licenceType;
    let format = shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat;
    let priceOfArticle = shopingCart[1].objectsOfDesire[currentProductIndex].price;
    let productCounter = shopingCart[1].objectsOfDesire[currentProductIndex].productCounter;
    let originalCategoryIndex = shopingCart[1].objectsOfDesire[currentProductIndex].position[0];
    let originalProductIndex = shopingCart[1].objectsOfDesire[currentProductIndex].position[1];
    return getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, productCounter, originalCategoryIndex, originalProductIndex);
}

function changeLicenseDisplay(currentProductIndex) {
    let increaseButtonLicenseDisplayRef = document.getElementById(`idCurrentLicenseLevelArticle${currentProductIndex}`);
    let currentLicense = getActualLicenseType(currentProductIndex);
    increaseButtonLicenseDisplayRef.innerHTML = "";
    increaseButtonLicenseDisplayRef.innerHTML = `${LICENSES[currentLicense].licenseKey}`;
    shopingCart[1].objectsOfDesire[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
}

function changeFormatDisplay(currentProductIndex) {
    let increaseButtonFormatDisplayRef = document.getElementById(`idCurrentFormatTypeArticle${currentProductIndex}`);
    let currentFormat = getActualFormatType(currentProductIndex);
    increaseButtonFormatDisplayRef.innerHTML = "";
    increaseButtonFormatDisplayRef.innerHTML = `${AUDIO_FORMATS[currentFormat].formatKey}`;
    shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
}

function increaseLicenseLevel(currentProductIndex) {
    let currentLicense = getActualLicenseType(currentProductIndex);
    if (currentLicense >= 0 && currentLicense <= 2) {
        currentLicense++;
        shopingCart[1].objectsOfDesire[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
    }
    return currentProductIndex;
    // let positiOfOriginalProduct = shopingCart[currentProductIndex].position;
    // console.log(positiOfOriginalProduct);
    // return positiOfOriginalProduct;
};

function increaseFormatLevel(currentProductIndex) {
    let currentFormat = getActualFormatType(currentProductIndex);
    if (currentFormat >= 0 && currentFormat <= 2) {
        currentFormat++;
        shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
    }
    return currentProductIndex;
    // let positiOfOriginalProduct = shopingCart[currentProductIndex].position;
    // console.log(positiOfOriginalProduct);
    // return positiOfOriginalProduct;
};

function decreaseLicenseLevel(currentProductIndex) {
    let currentLicense = getActualLicenseType(currentProductIndex);
    if (currentLicense > 0 && currentLicense <= 3) {
        currentLicense--;
        shopingCart[1].objectsOfDesire[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
        return;
    }
    else if (currentLicense === 0) {
        return;
    }
};

function decreaseFormatLevel(currentProductIndex) {
    let currentFormat = getActualFormatType(currentProductIndex);
    if (currentFormat > 0 && currentFormat <= 3) {
        currentFormat--;
        shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
        return;
    } else if (currentFormat === 0) {
        return;
    };
};

function updateAddedButtonContent(currentProductIndex) {
    let articleButtonNumberRef = shopingCart[1].objectsOfDesire[currentProductIndex].productCounter;
    const TO_UPDATE_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${articleButtonNumberRef}`);
    TO_UPDATE_BUTTON_REF.innerHTML = `${shopingCart[1].objectsOfDesire[currentProductIndex].licenceType} / ${shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat} ADDED`;

}

function updateAddedButtonContent(currentProductIndex, isDeleted = false) {
    let articleButtonNumberRef = shopingCart[1].objectsOfDesire[currentProductIndex].productCounter;
    const TO_UPDATE_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${articleButtonNumberRef}`);

    if (isDeleted) {
        TO_UPDATE_BUTTON_REF.innerHTML = "Add to Shoping Cart";
    } else {
        TO_UPDATE_BUTTON_REF.innerHTML = `${shopingCart[1].objectsOfDesire[currentProductIndex].licenceType} / ${shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat} ADDED`;
    }
}


function decreaseLicense(currentProductIndex) {
    decreaseLicenseLevel(currentProductIndex);
    changeLicenseDisplay(currentProductIndex);
    showAddedConfirmation(...getInfo(currentProductIndex));
    updateAddedButtonContent(currentProductIndex);
}

function increaseLicense(currentProductIndex) {
    increaseLicenseLevel(currentProductIndex);
    changeLicenseDisplay(currentProductIndex);
    showAddedConfirmation(...getInfo(currentProductIndex));
    updateAddedButtonContent(currentProductIndex);
}

function decreaseFormat(currentProductIndex) {
    decreaseFormatLevel(currentProductIndex);
    changeFormatDisplay(currentProductIndex);
    showAddedConfirmation(...getInfo(currentProductIndex));
    updateAddedButtonContent(currentProductIndex);
}

function increaseFormat(currentProductIndex) {

    increaseFormatLevel(currentProductIndex);
    changeFormatDisplay(currentProductIndex);
    showAddedConfirmation(...getInfo(currentProductIndex));
    updateAddedButtonContent(currentProductIndex);
}

function getInfo(currentProductIndex) {
    let positiOfOriginalProduct = shopingCart[1].objectsOfDesire[currentProductIndex].position;
    let i = positiOfOriginalProduct[0];
    let indexOfProductCard = positiOfOriginalProduct[1];
    let productCounter = shopingCart[1].objectsOfDesire[currentProductIndex].productCounter;
    return [i, indexOfProductCard, productCounter, currentProductIndex];
}

// #region PRICE CALCULATION

// bei add to shoping cart button click
// price in warenkorb
// price von warenkorb in subtotal berechrechnung

function calculateSubTotalPrice() {
    // if Abfrage rein
    const SUB_TOTAL_PRICE_REF = document.getElementById("idSubtotalPrice");
    let result = 0;
    for (let article = 0; article < shopingCart[1].objectsOfDesire.length; article++) {
        let price = Number(shopingCart[1].objectsOfDesire[article].price);

        result += price;

    }
    SUB_TOTAL_PRICE_REF.innerHTML = `${result.toFixed(2).replace(".", ",")} €`;
}

function chooseKindOfDelivery() {

}

function calculateTotalPrice() {
    const TOTAL_PRICE_REF = document.getElementById("idTotalPrice");
    let result = 0;
    for (let article = 0; article < shopingCart[1].objectsOfDesire.length; article++) {
        let price = Number(shopingCart[1].objectsOfDesire[article].price);

        result += price;

    }
    TOTAL_PRICE_REF.innerHTML = `${result.toFixed(2).replace(".", ",")} €`;
    return result;

}

function showTotalPriceOnButton() {
    const PURCHASE_CONFIRM_BUTTON_REF = document.getElementById("idPurchaseConfirmButton");
    PURCHASE_CONFIRM_BUTTON_REF.innerHTML = "";
    let shownButtonPrice = Number(calculateTotalPrice()).toFixed(2);
    PURCHASE_CONFIRM_BUTTON_REF.innerHTML = `BUY NOW ${shownButtonPrice} €`;

}

function getCartIndexByCatalogPosition(categoryIndex, productIndex) {
    const cartItems = shopingCart[1].objectsOfDesire;

    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].position[0] === categoryIndex && cartItems[i].position[1] === productIndex) {
            return i;
        }
    }

    return -1;
}

// function deleteObjectOfDesire(toDeleteProductIndex, productCounter) {
function deleteObjectOfDesire(toDeleteProductIndex) {
    updateAddedButtonContent(toDeleteProductIndex, true);
    shopingCart[1].objectsOfDesire.splice(toDeleteProductIndex, 1);
    updateShopingCartBadge();

    if (shopingCart[1].objectsOfDesire.length === 0) {
        const SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
        if (SHOPING_CART_REF) {
            SHOPING_CART_REF.remove();
        }
        renderEmptyShopingCart();
    } else {
        renderShopingCartContent();
        calculateSubTotalPrice();
        calculateTotalPrice();
        showTotalPriceOnButton();

    }
}

// function openShopingCart() {
//     let SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
//     let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
//     if (SHOPING_CART_REF == null || SHOPING_CART_REF.contains("idEmptyShopingCartMessage")) {
//         renderEmptyShopingCart();
//     }
//     else {
//         renderShopingCart();
//         SHOPING_CART_REF.classList.toggle("Hide");
//         SHOPING_CART_REF.classList.toggle("MobileShopingCart");
//         // SHOPING_CART_CURRENT_CONTENT_REF.classList.toggle("ShopingCartCurrentContent");
//         SHOPING_CART_CURRENT_CONTENT_REF.classList.toggle("EmptyShopingCartInnerContent");
//     }

// }
// function openShopingCart() {
//     let SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
//     let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
//     let SHOPING_CART_BUTTON_REF = document.getElementById("idShopingCartButton");
//     let isClicked = SHOPING_CART_BUTTON_REF.dataset.clicked === "true";
//     if (SHOPING_CART_REF === null) {
//         renderEmptyShopingCart();
//         SHOPING_CART_BUTTON_REF.dataset.clicked = "true";

//     } else if (SHOPING_CART_REF !== null && shopingCart[1].objectsOfDesire.length === 0) {
//         // renderEmptyShopingCart();
//         SHOPING_CART_REF.classList.toggle("Hide");
//         SHOPING_CART_REF.classList.toggle("MobileShopingCart");
//     }
//     else if (isClicked) {
//         SHOPING_CART_REF.classList.toggle("MobileShopingCart");
//     }
//     else {
//         renderShopingCart();
//         SHOPING_CART_REF.classList.toggle("MobileShopingCart");
//         SHOPING_CART_CURRENT_CONTENT_REF.classList.remove("EmptyShopingCartInnerContent");

//         SHOPING_CART_REF.classList.add("MobileShopingCart");
//         // SHOPING_CART_CURRENT_CONTENT_REF.classList.toggle("ShopingCartCurrentContent");
//     }

// }


function renderEmptyShopingCart() {
    const ALLCATEGORIES_REF = document.getElementById("idAllCategories");
    let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
    ALLCATEGORIES_REF.innerHTML += getEmptyShopingCartTemplate();
    SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
    // SHOPING_CART_REF.classList.toggle("Hide");
    // SHOPING_CART_REF.classList.toggle("MobileShopingCart");
    // SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
    // SHOPING_CART_CURRENT_CONTENT_REF.classList.toggle("ShopingCartCurrentContent");
    // SHOPING_CART_CURRENT_CONTENT_REF.classList.toggle("EmptyShopingCartInnerContent");


}

function updateShopingCartBadge() {
    const SHOPING_CART_BADGE_REF = document.getElementById("idCurrentShopingCartContent");
    const amountOfProductsInShopingCart = shopingCart[1].objectsOfDesire.length;

    if (!SHOPING_CART_BADGE_REF) return;

    if (amountOfProductsInShopingCart === 0) {
        SHOPING_CART_BADGE_REF.classList.add("Hide");
        SHOPING_CART_BADGE_REF.innerHTML = "0";
    } else {
        SHOPING_CART_BADGE_REF.classList.remove("Hide");
        SHOPING_CART_BADGE_REF.classList.add("CurrentShopingCartContent");
        SHOPING_CART_BADGE_REF.innerHTML = amountOfProductsInShopingCart;
    }
}

function closeShopingCart() {
    const SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
    const SHOPING_CART_BUTTON_REF = document.getElementById("idShopingCartButton");

    if (SHOPING_CART_REF) {
        SHOPING_CART_REF.classList.add("Hide");
    }
    if (SHOPING_CART_BUTTON_REF) {
        SHOPING_CART_BUTTON_REF.dataset.clicked = "false";
    }
}

function toggleShopingCart() {
    let SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
    const SHOPING_CART_BUTTON_REF = document.getElementById("idShopingCartButton");
    const hasItems = shopingCart[1].objectsOfDesire.length > 0;

    if (SHOPING_CART_REF === null) {
        if (hasItems) {
            renderShopingCart();
        } else {
            renderEmptyShopingCart();
        }
        SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
        if (SHOPING_CART_BUTTON_REF) {
            SHOPING_CART_BUTTON_REF.dataset.clicked = "true";
        }
        return;
    }

    const isHidden = SHOPING_CART_REF.classList.contains("Hide");

    if (isHidden) {
        SHOPING_CART_REF.classList.remove("Hide");
        SHOPING_CART_REF.classList.add("MobileShopingCart");
        if (SHOPING_CART_BUTTON_REF) {
            SHOPING_CART_BUTTON_REF.dataset.clicked = "true";
        }
    } else {
        closeShopingCart();
    }
}

function closeShopingCartModal() {
    let SHOPING_CART_REF = document.getElementById("idMobileShopingCart");
    if (SHOPING_CART_REF && SHOPING_CART_REF.open) {
        if (SHOPING_CART_REF && SHOPING_CART_REF.open && SHOPING_CART_REF.classList.contains("EmptyShopingCartInnerContent")) {
            SHOPING_CART_REF.close();
            SHOPING_CART_REF.classList.add("Hide");
            SHOPING_CART_REF.classList.remove("MobileShopingCart");
            SHOPING_CART_REF.classList.remove("EmptyShopingCartInnerContent");
        }
        else {
            SHOPING_CART_REF.close();
            SHOPING_CART_REF.classList.add("Hide");
            SHOPING_CART_REF.classList.remove("MobileShopingCart");
        }
    }

    // SHOPING_CART_REF.classList.add("Hide");
    // SHOPING_CART_REF.classList.remove("MobileShopingCart");
}

function increasePrice() {

}

function increaseArticlePrice(currentProductIndex) {
    let currentLicenseIndex = getActualLicenseType(currentProductIndex);
    let currentFormatIndex = getActualFormatType(currentProductIndex);
    let priceExtraCharge = 0;
    priceExtraCharge += getLicenseExtraPriceValue(currentProductIndex, currentLicenseIndex);
    priceExtraCharge += getFormatExtraPriceValue(currentProductIndex, currentFormatIndex);
    let priceOfArticle = Number(shopingCart[1].objectsOfDesire[currentProductIndex].price);
    priceOfArticle += priceExtraCharge;
    shopingCart[1].objectsOfDesire[currentProductIndex].price = priceOfArticle;
    const PRODUCT_PRICE_DISPLAY_SHOPING_CART_REF = document.getElementById(`idCurrentPriceArticle${currentProductIndex}`);
    PRODUCT_PRICE_DISPLAY_SHOPING_CART_REF.innerHTML = `<b>${priceOfArticle.toFixed(2)} €</b>`;
    calculateSubTotalPrice();
    calculateTotalPrice();
    showTotalPriceOnButton();
}

function decreaseArticlePrice(currentProductIndex) {
    let currentLicenseIndex = getActualLicenseType(currentProductIndex);
    let currentFormatIndex = getActualFormatType(currentProductIndex);
    let priceExtraCharge = 0;
    priceExtraCharge += getLicenseExtraPriceValue(currentProductIndex, currentLicenseIndex);
    priceExtraCharge += getFormatExtraPriceValue(currentProductIndex, currentFormatIndex);
    let priceOfArticle = Number(shopingCart[1].objectsOfDesire[currentProductIndex].price);
    priceOfArticle -= priceExtraCharge;
    shopingCart[1].objectsOfDesire[currentProductIndex].price = priceOfArticle;
    const PRODUCT_PRICE_DISPLAY_SHOPING_CART_REF = document.getElementById(`idCurrentPriceArticle${currentProductIndex}`);
    PRODUCT_PRICE_DISPLAY_SHOPING_CART_REF.innerHTML = `<b>${priceOfArticle.toFixed(2)} €</b>`;
    calculateSubTotalPrice();
    calculateTotalPrice();
    showTotalPriceOnButton();
}

function getLicenseExtraPriceValue(currentProductIndex, currentLicenseIndex) {
    switch (shopingCart[1].objectsOfDesire[currentProductIndex].licenceType) {
        case "free":
            return Number(LICENSES[currentLicenseIndex].extraPrice);
        case "basic":
            return Number(LICENSES[currentLicenseIndex].extraPrice);
        case "pro":
            return Number(LICENSES[currentLicenseIndex].extraPrice);
        case "exclusive":
            return Number(LICENSES[currentLicenseIndex].extraPrice);
    }
};

function getFormatExtraPriceValue(currentProductIndex, currentLicenseIndex) {
    switch (shopingCart[1].objectsOfDesire[currentProductIndex].audioFormat) {
        case "mp3":
            return Number(AUDIO_FORMATS[currentLicenseIndex].extraPrice);
        case "wav":
            return Number(AUDIO_FORMATS[currentLicenseIndex].extraPrice);
        case "flac":
            return Number(AUDIO_FORMATS[currentLicenseIndex].extraPrice);
        case "master":
            return Number(AUDIO_FORMATS[currentLicenseIndex].extraPrice);
    }
};

// hier werden je nach Anforderung 2 oder 3 Parameter/Argumente im Template übergeben
// 2 wenn der Preis angepasst werden scroll
// 3 wenn er auf seinen Ursprungswert zurückgesetzt werden soll
function updatePriceOnWebsite() {
    const PRODUCT_PRICE_REF = document.getElementById(`idProduct_${arguments[0]}_Price`);
    if (arguments.length === 2) {
        PRODUCT_PRICE_REF.innerHTML = `<b>${shopingCart[1].objectsOfDesire[arguments[1]].price.toFixed(2)} €</b>`;
    }
    else {
        PRODUCT_PRICE_REF.innerHTML = `<b>${loopCatalog[arguments[1]].loops[arguments[2]].price.toFixed(2)} €</b>`
    }
};

function renderOrderConfirmationModal() {
    const MAIN_CONTAINER = document.querySelector('main');
    MAIN_CONTAINER.innerHTML += getOrderConfirmationModalTemplate();
    showOrderConfirmationModal();
}

function showOrderConfirmationModal() {
    const CONFIRMATION_MODAL = document.getElementById("idSentConfirmationModal");
    CONFIRMATION_MODAL.showModal();

}
function closeOrderConfirmationModal() {
    const CONFIRMATION_MODAL = document.getElementById("idSentConfirmationModal");

    if (CONFIRMATION_MODAL) {
        // CONFIRMATION_MODAL.remove();
        // toggleShopingCart();
        location.reload();
    }
}

function eventprevention(event) {
    event.stopPropagation();
}



// #endregion
// -------------------------------------------------------------



// #endregion
//-------------------------------------------------------------


// #endregion
// -------------------------------------------------------------

// ==============================================================

// #region BLANCO

// #endregion
// -------------------------------------------------------------
// #region PRICE CALCULATION

// #endregion
// -------------------------------------------------------------