const productSearch = document.getElementById("productSearch");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");
const noProductsMessage = document.getElementById("noProductsMessage");

function filterProducts() {
    const searchText = productSearch.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleProducts = 0;

    productCards.forEach((card) => {
        const productName = card.dataset.name.toLowerCase();
        const productCategory = card.dataset.category;

        const matchesSearch = productName.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleProducts++;
        } else {
            card.style.display = "none";
        }
    });

    noProductsMessage.style.display =
        visibleProducts === 0 ? "block" : "none";
}

productSearch.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
