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
        console.log(loopCatalog[i].category);
        ALL_CATEGORIES_REF.innerHTML += getCategoryTemplate(i);
    }
}



// #endregion
// -------------------------------------------------------------

// ==============================================================

// #region BLANCO

// #endregion
// -------------------------------------------------------------