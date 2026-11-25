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
    let categoryIndex = i;
    let productIndex = getProductIndex(indexOfProductCard);
    let productsInShopingCart = shopingCart[1].objectsOfDesire.length;
    // console.log(`category: ${categoryIndex} productIndex: ${productIndex}`);
    // shopingCart.push(loopCatalog[i].loops[i]);
    // console.log(shopingCart);
    let productInformationRef = loopCatalog[categoryIndex].loops[productIndex];
    // let infoForShopingCart = [];


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
    shopingCart[1].objectsOfDesire.push(productData);
    console.log(shopingCart[1].objectsOfDesire);
    // renderShopingCart(productCounter);
    renderShopingCart(i, indexOfProductCard);

    showAddedConfirmation(i, indexOfProductCard, productCounter, productsInShopingCart);
    calculateSubTotalPrice();
    calculateTotalPrice();
    // console.log(titleOfProduct);
    // infoForShopingCart.push(titleOfProduct);
    // console.log(infoForShopingCart);
}

// function showAddedConfirmation(indexOfProductCard, license, format) {
function showAddedConfirmation(i, indexOfProductCard, productCounter, currentProductIndexInShopingCart) {
    const BUTTON_OF_PRODUCT = document.getElementById(`idAddToShopingCartButton_${productCounter}`);

    let currentLicenseIndex = getActualLicenseType(currentProductIndexInShopingCart);
    let currentFormatIndex = getActualFormatType(currentProductIndexInShopingCart);
    // BUTTON_OF_PRODUCT.innerHTML = "free/mp3 Added";
    BUTTON_OF_PRODUCT.innerHTML = `${LICENSES[currentLicenseIndex].licenseKey}/ ${AUDIO_FORMATS[currentFormatIndex].formatKey} ADDED`;

    `LICENSES[${currentLicenseIndex}].licenseKey/AUDIO_FORMATS[${currentFormatIndex}].formatKey ADDED`
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
    const SHOPINC_CART_REF = document.getElementById("idMobileShopingCart");
    if (SHOPINC_CART_REF !== null) {
        renderShopingCartContent(i, indexOfProductCard);
    }
    else {
        // PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML = "";
        PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML += getShopingCartTemplate();
        renderShopingCartContent(i, indexOfProductCard);
    }
    // for (let currentProductIndex = 0; currentProductIndex < shopingCart.length; currentProductIndex++) {
    //     let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
    //     // SHOPING_CART_CURRENT_CONTENT_REF = "";
    //     SHOPING_CART_CURRENT_CONTENT_REF.innerHTML = renderProductCardForShopingCart(currentProductIndex);
    //     // SHOPING_CART_CURRENT_CONTENT_REF.innerHTML = renderProductCardForShopingCart(currentProductIndex, productCounter);
    // }
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
    let originalCategoryIndex = shopingCart[1].objectsOfDesire[currentProductIndex].position[0];
    let originalProductIndex = shopingCart[1].objectsOfDesire[currentProductIndex].position[1];
    return getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, originalCategoryIndex, originalProductIndex);
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

}

function showTotalPriceOnButton() {
    const PURCHASE_CONFIRM_BUTTON_REF = document.getElementById("idPurchaseConfirmButton");

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

function deleteObjectOfDesire(toDeleteProductIndex) {
    // const PRODUCT_REF = shopingCart[1].objectsOfDesire[toDeleteProductIndex];
    shopingCart[1].objectsOfDesire.splice(toDeleteProductIndex, 1);
    renderShopingCartContent();


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