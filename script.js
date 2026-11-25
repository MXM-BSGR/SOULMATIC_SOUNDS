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

function addToShopingCart(i, indexOfProductCard, productCount) {
    let categoryIndex = i;
    let productIndex = getProductIndex(indexOfProductCard);
    // console.log(`category: ${categoryIndex} productIndex: ${productIndex}`);
    // shopingCart.push(loopCatalog[i].loops[i]);
    // console.log(shopingCart);
    let productInformationRef = loopCatalog[categoryIndex].loops[productIndex];
    // let infoForShopingCart = [];
    let titleOfProduct = productInformationRef.title;
    let licenseTypeOfProduct = productInformationRef.currentLicense;
    let formatTypeOfProduct = productInformationRef.currentFormat;
    let priceOfProduct = productInformationRef.price.toFixed(2);
    let productData = {
        "product": titleOfProduct,
        "licenceType": licenseTypeOfProduct,
        "audioFormat": formatTypeOfProduct,
        "price": priceOfProduct,
        "position": [i, indexOfProductCard],
        "productCount": productCount
    };
    shopingCart.push(productData);
    console.log(shopingCart);
    showAddedConfirmation(indexOfProductCard);
    renderShopingCart(productCount);
    // console.log(titleOfProduct);
    // infoForShopingCart.push(titleOfProduct);
    // console.log(infoForShopingCart);
}

// function showAddedConfirmation(indexOfProductCard, license, format) {
function showAddedConfirmation(indexOfProductCard) {
    const BUTTON_OF_PRODUCT = document.getElementById(`idAddToShopingCartButton_${indexOfProductCard}`);
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

function renderShopingCart(productCount) {
    const PRODUCT_CATEGORYS_WRAPPER_REF = document.getElementById("idProductCategorysWrapper");
    // PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML = "";
    PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML += getShopingCartTemplate();
    for (let currentProductIndex = 0; currentProductIndex < shopingCart.length; currentProductIndex++) {
        let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
        // SHOPING_CART_CURRENT_CONTENT_REF = "";
        SHOPING_CART_CURRENT_CONTENT_REF.innerHTML = renderProductCardForShopingCart(currentProductIndex, productCount);
    }
}

function renderProductCardForShopingCart(currentProductIndex, productCount) {
    let titleOfProduct = shopingCart[currentProductIndex].product;
    let license = shopingCart[currentProductIndex].licenceType;
    let format = shopingCart[currentProductIndex].audioFormat;
    let priceOfArticle = shopingCart[currentProductIndex].price;
    let originalCategoryIndex = shopingCart[currentProductIndex].position[0];
    let originalProductIndex = shopingCart[currentProductIndex].position[1];
    return getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle, originalCategoryIndex, originalProductIndex);
}

function changeLicense(currentProductIndex) {
    let increaseButtonDisplayRef = document.getElementById(`idCurrentLicenseLevelArticle${currentProductIndex}`);
    let currentLicense = getActualLicenseType(currentProductIndex);

    // if (currentLicense === 0 || currentLicense === 1 || currentLicense === 2) {
    //     currentLicense++;
    // }
    // else if (currentLicense === 3) {
    //     return currentLicense;
    // };
    increaseButtonDisplayRef.innerHTML = "";
    increaseButtonDisplayRef.innerHTML = `${LICENSES[currentLicense].licenseKey}`;
    shopingCart[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
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

function decreaseLicenseLevel(currentProductIndex) {
    let currentLicense = getActualLicenseType(currentProductIndex);
    if (currentLicense >= 0 && currentLicense <= 3) {
        currentLicense--;
        shopingCart[currentProductIndex].licenceType = `${LICENSES[currentLicense].licenseKey}`;
        return;
    }
};

function updateAddedButtonContent(currentProductIndex) {
    let articleButtonNumberRef = shopingCart[currentProductIndex].productCount;
    const TO_UPDATE_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${articleButtonNumberRef}`);
    TO_UPDATE_BUTTON_REF.innerHTML = `LICENSES[${currentLicenseIndex}].licenseKey/AUDIO_FORMATS[${currentFormatIndex}].formatKey ADDED`;


}


// function getCurrentLicenseType(currentProductIndex) {
//     return shopingCart[currentProductIndex].licenceType;
// }

// #endregion
//-------------------------------------------------------------


// #endregion
// -------------------------------------------------------------

// ==============================================================

// #region BLANCO

// #endregion
// -------------------------------------------------------------