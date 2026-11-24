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

    ALL_CATEGORIES_REF.innerHTML = "";
    for (let i = 0; i < loopCatalog.length; i++) {
        // console.log(loopCatalog[i].category);
        ALL_CATEGORIES_REF.innerHTML += getCategoryTemplate(i);
        renderProductCards(i);
    }
}

function renderProductCards(i) {
    let productCardsWrapperRef = document.getElementById(`idProductCardsCategory_${i}_Wrapper`);
    let productCounter = 0;

    for (let indexOfProductCard = 0; indexOfProductCard < loopCatalog[i].loops.length; indexOfProductCard++) {
        // console.log(loopCatalog[i].loops[indexOfProductCard]);
        productCardsWrapperRef.innerHTML += getProductCardTemplate(i, indexOfProductCard, productCounter);
        productCounter++;
    }
}

// function renderProductContent(i, indexOfProductCard) {
//     const PRODUCT_CONTENT_REF = document.getElementById("idProduct_${indexOfProductCard}_Content");

//     let pathToContent = "loopCatalog[i].loops[indexOfProductCard].includedSamples";

//     for (let currentContentIndex = 0; currentContentIndex > pathToContent.length; currentContentIndex++) {
//         console.log(loopCatalog[i].loops[indexOfProductCard].includedSamples.length);
//     }
// }

// #region SHOPING CART

function addToShopingCart(i, indexOfProductCard) {
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
        // "position"
    };
    shopingCart.push(productData);
    console.log(shopingCart);
    showAddedConfirmation(indexOfProductCard);
    renderShopingCart();
    // console.log(titleOfProduct);
    // infoForShopingCart.push(titleOfProduct);
    // console.log(infoForShopingCart);
}

// function showAddedConfirmation(indexOfProductCard, license, format) {
function showAddedConfirmation(indexOfProductCard) {
    const BUTTON_OF_PRODUCT = document.getElementById(`idAddToShopingCartButton_${indexOfProductCard}`);
    // get
    BUTTON_OF_PRODUCT.innerHTML = "free/mp3 Added";
}

function getProductIndex(indexOfProductCard) {
    const PRODUCT_BUTTON_REF = document.getElementById(`idAddToShopingCartButton_${indexOfProductCard}`);
    // console.log(PRODUCT_BUTTON_REF.value);
    return PRODUCT_BUTTON_REF.value;
}

function renderShopingCart() {
    const PRODUCT_CATEGORYS_WRAPPER_REF = document.getElementById("idProductCategorysWrapper");
    // PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML = "";
    PRODUCT_CATEGORYS_WRAPPER_REF.innerHTML += getShopingCartTemplate();
    for (let currentProductIndex = 0; currentProductIndex < shopingCart.length; currentProductIndex++) {
        let SHOPING_CART_CURRENT_CONTENT_REF = document.getElementById("idShopingCartCurrentContent");
        // SHOPING_CART_CURRENT_CONTENT_REF = "";
        SHOPING_CART_CURRENT_CONTENT_REF.innerHTML = renderProductCardForShopingCart(currentProductIndex);
    }
}

function renderProductCardForShopingCart(currentProductIndex) {
    let titleOfProduct = shopingCart[currentProductIndex].product;
    let license = shopingCart[currentProductIndex].licenceType;
    let format = shopingCart[currentProductIndex].audioFormat;
    let priceOfArticle = shopingCart[currentProductIndex].price;
    return getShopingCartArticleTemplate(currentProductIndex, titleOfProduct, license, format, priceOfArticle);
}

function changeLicense(currentProductIndex) {
    let increaseButtonRef = document.getElementById(`idIncreaseLicenseArticle${currentProductIndex}`);
    let currentLicense = getCurrentLicenseType(currentProductIndex);
    // let licenseValue = 

}

function getCurrentLicenseType(currentProductIndex) {
    return shopingCart[currentProductIndex].licenceType;
}

// #endregion
//-------------------------------------------------------------


// #endregion
// -------------------------------------------------------------

// ==============================================================

// #region BLANCO

// #endregion
// -------------------------------------------------------------