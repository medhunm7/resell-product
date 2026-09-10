let products = JSON.parse(
    localStorage.getItem("remarketProducts")
) || [
    {
        id: 1,
        name: "iPhone 13",
        category: "Electronics",
        price: 32000,
        seller: "Arun",
        phone: "9876543210",
        description: "Good condition iPhone 13 with charger.",
        image:
        "https://images.unsplash.com/photo-1592286927505-2fd0b6e4e2f0"
    },

    {
        id: 2,
        name: "Study Table",
        category: "Furniture",
        price: 2500,
        seller: "Priya",
        phone: "9876543211",
        description: "Wooden study table in good condition.",
        image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
    },

    {
        id: 3,
        name: "Mountain Bicycle",
        category: "Vehicles",
        price: 7500,
        seller: "Karthik",
        phone: "9876543212",
        description: "Used mountain bicycle. Works perfectly.",
        image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e"
    },

    {
        id: 4,
        name: "Java Programming Book",
        category: "Books",
        price: 600,
        seller: "Ravi",
        phone: "9876543213",
        description: "Java programming book in excellent condition.",
        image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
    }
];

let favorites =
    JSON.parse(localStorage.getItem("remarketFavorites")) || [];

let selectedProduct = null;

const productList =
    document.getElementById("productList");

const search =
    document.getElementById("search");

const category =
    document.getElementById("category");

const price =
    document.getElementById("price");

const productCount =
    document.getElementById("productCount");


function saveProducts() {

    localStorage.setItem(
        "remarketProducts",
        JSON.stringify(products)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "remarketFavorites",
        JSON.stringify(favorites)
    );

}


function displayProducts() {

    const text =
        search.value.toLowerCase();

    const selectedCategory =
        category.value;

    const maxPrice =
        price.value;

    const filtered =
        products.filter(product => {

            const matchesText =
                product.name
                    .toLowerCase()
                    .includes(text);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            const matchesPrice =
                maxPrice === "all" ||
                product.price <= Number(maxPrice);

            return (
                matchesText &&
                matchesCategory &&
                matchesPrice
            );

        });

    productCount.textContent =
        `${filtered.length} products`;

    productList.innerHTML = "";

    if (filtered.length === 0) {

        productList.innerHTML =
            "<p>No products found 😔</p>";

        return;

    }

    filtered.forEach(product => {

        const isFavorite =
            favorites.includes(product.id);

        productList.innerHTML += `

            <div class="card">

                <img src="${product.image}"
                     alt="${product.name}">

                <div class="card-body">

                    <h3>${product.name}</h3>

                    <span class="category">
                        ${product.category}
                    </span>

                    <p class="price">
                        ₹${product.price.toLocaleString()}
                    </p>

                    <p>
                        Seller: ${product.seller}
                    </p>

                    <div class="card-buttons">

                        <button class="view-btn"
                            onclick="viewProduct(${product.id})">
                            View Details
                        </button>

                        <button class="fav-btn"
                            onclick="toggleFavorite(${product.id})">
                            ${isFavorite ? "❤️" : "♡"}
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


function viewProduct(id) {

    const product =
        products.find(p => p.id === id);

    if (!product) return;

    selectedProduct = product;

    document.getElementById("modalImage").src =
        product.image;

    document.getElementById("modalName").textContent =
        product.name;

    document.getElementById("modalPrice").textContent =
        "₹" + product.price.toLocaleString();

    document.getElementById("modalCategory").textContent =
        "Category: " + product.category;

    document.getElementById("modalDescription").textContent =
        product.description;

    document.getElementById("modalSeller").textContent =
        "Seller: " + product.seller;

    document.getElementById("callSeller").href =
        "tel:" + product.phone;

    document.getElementById("modal").style.display =
        "flex";

}


function closeModal() {

    document.getElementById("modal").style.display =
        "none";

}


function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(item => item !== id);

    } else {

        favorites.push(id);

    }

    saveFavorites();
    displayProducts();

}


document.getElementById("deleteBtn")
    .addEventListener("click", function () {

        if (!selectedProduct) return;

        const confirmDelete =
            confirm(
                "Are you sure you want to delete this listing?"
            );

        if (!confirmDelete) return;

        products =
            products.filter(
                p => p.id !== selectedProduct.id
            );

        favorites =
            favorites.filter(
                id => id !== selectedProduct.id
            );

        saveProducts();
        saveFavorites();

        closeModal();
        displayProducts();

    });


document.getElementById("sellForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const newProduct = {

            id: Date.now(),

            name:
                document.getElementById("productName").value,

            category:
                document.getElementById("productCategory").value,

            price:
                Number(
                    document.getElementById("productPrice").value
                ),

            seller:
                document.getElementById("sellerName").value,

            phone:
                document.getElementById("sellerPhone").value,

            description:
                document.getElementById("productDescription").value,

            image:
                document.getElementById("productImage").value ||
                "https://images.unsplash.com/photo-1495020689067-958852a7765e"

        };

        products.unshift(newProduct);

        saveProducts();

        displayProducts();

        this.reset();

        alert("🎉 Product listed successfully!");

        document.getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


search.addEventListener(
    "input",
    displayProducts
);

category.addEventListener(
    "change",
    displayProducts
);

price.addEventListener(
    "change",
    displayProducts
);


window.onclick = function(event) {

    const modal =
        document.getElementById("modal");

    if (event.target === modal) {
        closeModal();
    }

};


displayProducts();