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
    let productsInShopingCart = shopingCart.length;
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
        "product": titleOfProduct,
        "licenceType": licenseTypeOfProduct,
        "audioFormat": formatTypeOfProduct,
        "price": priceOfProduct,
        "position": [i, indexOfProductCard],
        "productCounter": productCounter
    };
    shopingCart.push(productData);
    console.log(shopingCart);
    // renderShopingCart(productCounter);
    renderShopingCart();

    showAddedConfirmation(i, productsInShopingCart, productCounter);
    // console.log(titleOfProduct);
    // infoForShopingCart.push(titleOfProduct);
    // console.log(infoForShopingCart);
}

// function showAddedConfirmation(indexOfProductCard, license, format) {
function showAddedConfirmation(i, indexOfProductCard, productCounter) {
    const BUTTON_OF_PRODUCT = document.getElementById(`idAddToShopingCartButton_${productCounter}`);
    let currentLicenseIndex = getActualLicenseType(indexOfProductCard);
    let currentFormatIndex = getActualFormatType(indexOfProductCard);
    // BUTTON_OF_PRODUCT.innerHTML = "free/mp3 Added";
    BUTTON_OF_PRODUCT.innerHTML = `${LICENSES[currentLicenseIndex].licenseKey}/ ${AUDIO_FORMATS[currentFormatIndex].formatKey} ADDED`;

    `LICENSES[${currentLicenseIndex}].licenseKey/AUDIO_FORMATS[${currentFormatIndex}].formatKey ADDED`
}



function getActualLicenseType(indexOfProductCard) {
    switch (shopingCart[indexOfProductCard].licenceType) {
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
    switch (shopingCart[indexOfProductCard].audioFormat) {
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
function renderShopingCart() {
    const PRODUCT_CATEGORYS_WRAPPER_REF = document.getElementById("idProductCategorysWrapper");
    const SHOPINC_CART_REF = document.getElementById("idMobileShopingCart");
    if (SHOPINC_CART_REF !== null) {
        renderShopingCartContent();
    }
    else {
        // PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML = "";
        PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML += getShopingCartTemplate();
        renderShopingCartContent();
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
    for (let currentProductIndex = 0; currentProductIndex < shopingCart.length; currentProductIndex++) {
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
    let titleOfProduct = shopingCart[currentProductIndex].product;
    let license = shopingCart[currentProductIndex].licenceType;
    let format = shopingCart[currentProductIndex].audioFormat;
    let priceOfArticle = shopingCart[currentProductIndex].price;
    let originalCategoryIndex = shopingCart[currentProductIndex].position[0];
    let originalProductIndex = shopingCart[currentProductIndex].position[1];
    return getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, originalCategoryIndex, originalProductIndex);
}

function changeLicenseDisplay(currentProductIndex) {
    let increaseButtonLicenseDisplayRef = document.getElementById(`idCurrentLicenseLevelArticle${currentProductIndex}`);
    let currentLicense = getActualLicenseType(currentProductIndex);
    increaseButtonLicenseDisplayRef.innerHTML = "";
    increaseButtonLicenseDisplayRef.innerHTML = `${LICENSES[currentLicense].licenseKey}`;
    shopingCart[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
}

function changeFormatDisplay(currentProductIndex) {
    let increaseButtonFormatDisplayRef = document.getElementById(`idCurrentFormatTypeArticle${currentProductIndex}`);
    let currentFormat = getActualFormatType(currentProductIndex);
    increaseButtonFormatDisplayRef.innerHTML = "";
    increaseButtonFormatDisplayRef.innerHTML = `${AUDIO_FORMATS[currentFormat].formatKey}`;
    shopingCart[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
}

function increaseLicenseLevel(currentProductIndex) {
    let currentLicense = getActualLicenseType(currentProductIndex);
    if (currentLicense >= 0 && currentLicense <= 2) {
        currentLicense++;
        shopingCart[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
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
        shopingCart[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
    }
    return currentProductIndex;
    // let positiOfOriginalProduct = shopingCart[currentProductIndex].position;
    // console.log(positiOfOriginalProduct);
    // return positiOfOriginalProduct;
};

function decreaseLicenseLevel(currentProductIndex) {
    let currentLicense = getActualLicenseType(currentProductIndex);
    if (currentLicense >= 0 && currentLicense <= 3) {
        currentLicense--;
        shopingCart[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
        return;
    }
};
function decreaseFormatLevel(currentProductIndex) {
    let currentFormat = getActualFormatType(currentProductIndex);
    if (currentFormat >= 0 && currentFormat <= 3) {
        currentFormat--;
        shopingCart[currentProductIndex].audioFormat = `${AUDIO_FORMATS[currentFormat].formatKey}`;
        return;
    }
};

function updateAddedButtonContent(currentProductIndex) {
    let articleButtonNumberRef = shopingCart[currentProductIndex].productCounter;
    const TO_UPDATE_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${articleButtonNumberRef}`);
    TO_UPDATE_BUTTON_REF.innerHTML = `${shopingCart[currentProductIndex].licenceType} / ${shopingCart[currentProductIndex].audioFormat} ADDED`;

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
    let positiOfOriginalProduct = shopingCart[currentProductIndex].position;
    let i = positiOfOriginalProduct[0];
    let indexOfProductCard = positiOfOriginalProduct[1]
    let productCounter = shopingCart[currentProductIndex].productCounter;
    return [i, indexOfProductCard, productCounter];
}

// #region PRICE CALCULATION

// bei add to shoping cart button click
// price in warenkorb
// price von warenkorb in subtotal berechrechnung
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