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
    let PRODUCT_CARDS_WRAPPER_REF = document.getElementById(`idProductCardsCategory_${i}_Wrapper`);

    for (let indexOfProductCard = 0; indexOfProductCard < loopCatalog[i].loops.length; indexOfProductCard++) {
        // console.log(loopCatalog[i].loops[indexOfProductCard]);
        PRODUCT_CARDS_WRAPPER_REF.innerHTML += getProductCardTemplate(i, indexOfProductCard);
    }
}


// function renderProductContent(i, indexOfProductCard) {
//     const PRODUCT_CONTENT_REF = document.getElementById("idProduct_${indexOfProductCard}_Content");

//     let pathToContent = "loopCatalog[i].loops[indexOfProductCard].includedSamples";

//     for (let currentContentIndex = 0; currentContentIndex > pathToContent.length; currentContentIndex++) {
//         console.log(loopCatalog[i].loops[indexOfProductCard].includedSamples.length);
//     }
// }


// #endregion
// -------------------------------------------------------------

// ==============================================================

// #region BLANCO

// #endregion
// -------------------------------------------------------------