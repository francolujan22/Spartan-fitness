/* =========================================================
   SPARTAN FITNESS STORE
   JAVASCRIPT — VERSIÓN 100% TAILWIND
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const CART_KEY = "spartan_cart";
const PRODUCTS_KEY = "spartan_products";
const PRODUCTS_VERSION_KEY = "spartan_products_version";

const PRODUCTS_VERSION = "4.0.0";

const WHATSAPP_NUMBER = "5492267467021";


/* =========================================================
   PRODUCTOS
   ========================================================= */

const defaultProducts = [

    {
        id: 1,
        name: "Proteína Body Advance 1 Kg",
        price: 43000,
        category: "Proteínas",
        stock: 4,
        image: "./imagenes/proteina_body.webp"
    },

    {
        id: 2,
        name: "Creatina ENA 300g",
        price: 43000,
        category: "Creatinas",
        stock: 4,
        image: "./imagenes/Creatina_ena.webp"
    },

    {
        id: 3,
        name: "Colágeno Hidrolizado Star Nutrition",
        price: 30000,
        category: "Suplementos",
        stock: 4,
        image: "./imagenes/Colageno_Hidrolizado.webp"
    },

    {
        id: 4,
        name: "Pancake Proteico Granger",
        price: 35000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/pancake-proteico-granger-sabor-vainilla.webp"
    },

    {
        id: 5,
        name: "Pancake Keto Granger",
        price: 35000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/Pancake-Keto-granger.webp"
    },

    {
        id: 6,
        name: "Pasta de Maní",
        price: 12000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/pasta_mani.webp"
    },

    {
        id: 7,
        name: "Hidromax Nutremax",
        price: 22000,
        category: "Hidratación",
        stock: 4,
        image: "./imagenes/Hydromax_nutremax.webp"
    },

    {
        id: 8,
        name: "Pro Salt Nutremax",
        price: 18000,
        category: "Hidratación",
        stock: 4,
        image: "./imagenes/Prosalt_nutremax.webp"
    },

    {
        id: 9,
        name: "Multivitamínico Gentech",
        price: 18000,
        category: "Vitaminas",
        stock: 4,
        image: "./imagenes/Multivitaminico_Gentech.webp"
    },

    {
        id: 10,
        name: "Gel Nutremax",
        price: 5000,
        category: "Energía",
        stock: 4,
        image: "./imagenes/Gel_nutremax.webp"
    },

    {
        id: 11,
        name: "Acelerador Metabólico ENA",
        price: 22000,
        category: "Quemadores",
        stock: 4,
        image: "./imagenes/Acelerador_Metabolico_ENA-nobg.png"
    },

    {
        id: 12,
        name: "Omega 3 Geonat",
        price: 25000,
        category: "Salud",
        stock: 4,
        image: "./imagenes/Omega_3.webp"
    },

    {
        id: 13,
        name: "Citrato de Magnesio ENA",
        price: 27000,
        category: "Minerales",
        stock: 4,
        image: "./imagenes/Magnesio_Ena.webp"
    },

    {
        id: 14,
        name: "Cupcakes Proteico Granger",
        price: 16000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/Cupcakes_Granger.webp"
    },

    {
        id: 15,
        name: "Omelette Granger",
        price: 16000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/Omelette_Granger.webp"
    },

    {
        id: 16,
        name: "Cookies Proteica Granger",
        price: 14000,
        category: "Alimentos",
        stock: 4,
        image: "./imagenes/cookies_proteicas.webp"
    },

    {
        id: 17,
        name: "Barritas Proteicas ENA",
        price: 43000,
        category: "Proteínas",
        stock: 4,
        image: "./imagenes/Barritas_Proteicas_ENA.webp"
    }

];


/* =========================================================
   ESTADO
   ========================================================= */

let products = [];
let cart = [];
let macroChart = null;
let calorieChart = null;


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (id) => document.getElementById(id);

const formatPrice = (price) => {

    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(price);

};


const escapeHTML = (text) => {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

};


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

function loadProducts() {

    try {

        const savedVersion =
            localStorage.getItem(PRODUCTS_VERSION_KEY);

        const savedProducts =
            localStorage.getItem(PRODUCTS_KEY);

        if (
            savedVersion === PRODUCTS_VERSION &&
            savedProducts
        ) {

            const parsed = JSON.parse(savedProducts);

            if (
                Array.isArray(parsed) &&
                parsed.length === defaultProducts.length
            ) {

                products = parsed;

                return;
            }
        }

    } catch (error) {

        console.warn(
            "No se pudieron cargar los productos:",
            error
        );

    }

    products = JSON.parse(
        JSON.stringify(defaultProducts)
    );

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );

    localStorage.setItem(
        PRODUCTS_VERSION_KEY,
        PRODUCTS_VERSION
    );

}


function loadCart() {

    try {

        const savedCart =
            localStorage.getItem(CART_KEY);

        cart = savedCart
            ? JSON.parse(savedCart)
            : [];

        if (!Array.isArray(cart)) {
            cart = [];
        }

    } catch (error) {

        console.warn(
            "No se pudo cargar el carrito:",
            error
        );

        cart = [];
    }

}


function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =========================================================
   IMÁGENES
   ========================================================= */

function imageHTML(product) {

    return `
        <img
            src="${product.image}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            class="w-full h-full object-contain
                   transition-transform duration-500
                   ease-out
                   group-hover:scale-110
                   active:scale-105"
            onerror="
                this.onerror=null;
                this.src='./imagenes/imagen-no-disponible.png';
            "
        >
    `;

}


/* =========================================================
   PRODUCTOS
   ========================================================= */

function renderProducts() {

    const container = $("product-grid");

    if (!container) return;

    if (!products.length) {

        container.innerHTML = `
            <div class="col-span-full
                        flex flex-col items-center justify-center
                        py-20 text-center">

                <div class="w-20 h-20 rounded-full
                            bg-zinc-900 border border-zinc-800
                            flex items-center justify-center
                            mb-5">

                    <i class="fa-solid fa-box-open
                              text-3xl text-orange-500"></i>

                </div>

                <h3 class="text-xl font-black text-white">
                    No hay productos disponibles
                </h3>

                <p class="text-zinc-500 mt-2">
                    Próximamente tendremos novedades.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = products.map(product => {

        const stockClass =
            product.stock <= 0
                ? "text-red-500"
                : product.stock <= 2
                    ? "text-yellow-400"
                    : "text-green-400";


        const stockText =
            product.stock <= 0
                ? "Sin stock"
                : product.stock <= 2
                    ? `Últimas ${product.stock} unidades`
                    : `${product.stock} disponibles`;


        const disabled =
            product.stock <= 0
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer";


        return `

            <article
                class="
                    product-card
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-gradient-to-b
                    from-zinc-900
                    to-black
                    shadow-xl
                    transition-all
                    duration-500
                    ease-out

                    hover:-translate-y-2
                    hover:border-orange-500/70
                    hover:shadow-[0_0_35px_rgba(255,107,0,0.15)]

                    active:scale-[0.99]
                "
            >

                <!-- BRILLO SUPERIOR -->

                <div
                    class="
                        absolute
                        inset-x-0
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-orange-500
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                    "
                ></div>


                <!-- IMAGEN -->

                <div
                    class="
                        product-image
                        relative
                        h-64
                        overflow-hidden
                        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_68%)]
                        flex
                        items-center
                        justify-center
                        p-6
                    "
                >

                    <div
                        class="
                            absolute
                            inset-8
                            rounded-full
                            bg-orange-500/5
                            blur-2xl
                            opacity-0
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                        "
                    ></div>

                    <div class="relative z-10 w-full h-full">

                        ${imageHTML(product)}

                    </div>

                </div>


                <!-- INFORMACIÓN -->

                <div class="product-info p-5">

                    <!-- CATEGORÍA -->

                    <span
                        class="
                            category
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-orange-500/20
                            bg-orange-500/10
                            px-3
                            py-1
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-orange-500
                        "
                    >
                        ${escapeHTML(product.category)}
                    </span>


                    <!-- NOMBRE -->

                    <h3
                        class="
                            mt-4
                            min-h-[52px]
                            text-lg
                            font-black
                            uppercase
                            leading-tight
                            text-white
                            transition-colors
                            duration-300
                            group-hover:text-orange-500
                        "
                    >
                        ${escapeHTML(product.name)}
                    </h3>


                    <!-- STOCK -->

                    <p
                        class="
                            stock
                            mt-3
                            text-xs
                            font-bold
                            ${stockClass}
                        "
                    >
                        <i class="fa-solid fa-circle text-[7px] mr-1"></i>
                        ${stockText}
                    </p>


                    <!-- PRECIO + BOTÓN -->

                    <div
                        class="
                            product-bottom
                            mt-5
                            flex
                            items-end
                            justify-between
                            gap-3
                        "
                    >

                        <div>

                            <span
                                class="
                                    block
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-wider
                                    text-zinc-500
                                "
                            >
                                Precio
                            </span>

                            <span
                                class="
                                    price
                                    block
                                    text-2xl
                                    font-black
                                    text-white
                                "
                            >
                                ${formatPrice(product.price)}
                            </span>

                        </div>


                        <button
                            type="button"
                            class="
                                add-btn
                                add-product-btn

                                inline-flex
                                shrink-0
                                items-center
                                justify-center
                                gap-2

                                rounded-xl

                                bg-orange-500
                                px-3
                                py-2

                                text-xs
                                font-black
                                uppercase

                                text-black

                                shadow-lg
                                shadow-orange-500/10

                                transition-all
                                duration-300

                                hover:bg-orange-400
                                hover:scale-105
                                hover:shadow-orange-500/30

                                active:scale-95

                                ${disabled}
                            "
                            data-product-id="${product.id}"
                            ${product.stock <= 0 ? "disabled" : ""}
                        >

                            <i class="fa-solid fa-cart-plus"></i>

                            Agregar

                        </button>

                    </div>

                </div>

            </article>

        `;

    }).join("");

}


/* =========================================================
   CARRITO
   ========================================================= */

function getCartCount() {

    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

}


function getCartTotal() {

    return cart.reduce((total, item) => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) return total;

        return total +
            product.price * item.quantity;

    }, 0);

}


function updateCartCount() {

    const count = getCartCount();

    const cartCount = $("cartCount");

    if (!cartCount) return;

    cartCount.textContent = count;

    if (count > 0) {

        cartCount.classList.remove(
            "opacity-0",
            "scale-0"
        );

        cartCount.classList.add(
            "opacity-100",
            "scale-100"
        );

    } else {

        cartCount.classList.remove(
            "opacity-100",
            "scale-100"
        );

        cartCount.classList.add(
            "opacity-0",
            "scale-0"
        );

    }

}


function renderCart() {

    const container = $("cartItems");

    if (!container) return;

    updateCartCount();


    if (!cart.length) {

        container.innerHTML = `

            <div
                class="
                    empty-cart
                    flex
                    flex-col
                    items-center
                    justify-center
                    py-16
                    px-6
                    text-center
                "
            >

                <div
                    class="
                        empty-cart-icon
                        mb-5
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-zinc-800
                        bg-zinc-900
                    "
                >

                    <i
                        class="
                            fa-solid
                            fa-cart-shopping
                            text-3xl
                            text-orange-500
                        "
                    ></i>

                </div>

                <h3
                    class="
                        text-lg
                        font-black
                        uppercase
                        text-white
                    "
                >
                    Tu arsenal está vacío 💪
                </h3>

                <p
                    class="
                        mt-2
                        max-w-xs
                        text-sm
                        text-zinc-500
                    "
                >
                    Agregá productos para comenzar tu pedido.
                </p>

            </div>

        `;

    } else {

        container.innerHTML = cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return "";

            return `

                <div
                    class="
                        cart-item
                        group
                        flex
                        gap-4
                        border-b
                        border-zinc-800
                        p-4
                        transition-colors
                        hover:bg-zinc-900/50
                    "
                    data-id="${product.id}"
                >

                    <!-- IMAGEN -->

                    <div
                        class="
                            relative
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            border
                            border-zinc-800
                            bg-zinc-900
                        "
                    >

                        <img
                            src="${product.image}"
                            alt="${escapeHTML(product.name)}"
                            class="
                                cart-item-image
                                h-full
                                w-full
                                object-contain
                                p-2
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            "
                            onerror="
                                this.onerror=null;
                                this.src='./imagenes/imagen-no-disponible.png';
                            "
                        >

                    </div>


                    <!-- INFORMACIÓN -->

                    <div
                        class="
                            cart-item-info
                            min-w-0
                            flex-1
                        "
                    >

                        <h4
                            class="
                                cart-item-title
                                line-clamp-2
                                text-sm
                                font-black
                                uppercase
                                leading-tight
                                text-white
                            "
                        >
                            ${escapeHTML(product.name)}
                        </h4>


                        <p
                            class="
                                cart-item-price
                                mt-1
                                text-sm
                                font-black
                                text-orange-500
                            "
                        >
                            ${formatPrice(product.price)}
                        </p>


                        <!-- ACCIONES -->

                        <div
                            class="
                                cart-item-actions
                                mt-3
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <button
                                type="button"
                                class="
                                    quantity-btn
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-zinc-700
                                    bg-zinc-900
                                    text-zinc-300
                                    transition-all
                                    hover:border-orange-500
                                    hover:text-orange-500
                                    active:scale-90
                                "
                                data-action="decrease"
                                data-id="${product.id}"
                                aria-label="Disminuir cantidad"
                            >
                                <i class="fa-solid fa-minus text-[10px]"></i>
                            </button>


                            <span
                                class="
                                    quantity
                                    flex
                                    min-w-[30px]
                                    justify-center
                                    text-sm
                                    font-black
                                    text-white
                                "
                            >
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                class="
                                    quantity-btn
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-lg
                                    border
                                    border-zinc-700
                                    bg-zinc-900
                                    text-zinc-300
                                    transition-all
                                    hover:border-orange-500
                                    hover:text-orange-500
                                    active:scale-90
                                "
                                data-action="increase"
                                data-id="${product.id}"
                                aria-label="Aumentar cantidad"
                            >
                                <i class="fa-solid fa-plus text-[10px]"></i>
                            </button>


                            <button
                                type="button"
                                class="
                                    remove-item
                                    ml-auto
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    rounded-lg
                                    text-zinc-600
                                    transition-all
                                    hover:bg-red-500/10
                                    hover:text-red-500
                                    active:scale-90
                                "
                                data-action="remove"
                                data-id="${product.id}"
                                aria-label="Eliminar producto"
                            >
                                <i class="fa-solid fa-trash text-xs"></i>
                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");

    }


    const totalElement = $("cartTotal");

    if (totalElement) {

        totalElement.textContent =
            formatPrice(getCartTotal());

    }

}


function addToCart(productId) {

    const product =
        products.find(
            p => p.id === Number(productId)
        );

    if (!product) return;


    if (product.stock <= 0) {

        showAlert(
            "Este producto no tiene stock disponible.",
            "warning"
        );

        return;
    }


    const existing =
        cart.find(
            item => item.id === product.id
        );


    if (existing) {

        if (
            existing.quantity >= product.stock
        ) {

            showAlert(
                `Solo quedan ${product.stock} unidades disponibles.`,
                "warning"
            );

            return;
        }

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }


    saveCart();

    renderCart();

    showAlert(
        `${product.name} agregado al carrito.`,
        "success"
    );

}


function changeQuantity(productId, amount) {

    const item =
        cart.find(
            item => item.id === Number(productId)
        );

    if (!item) return;


    const product =
        products.find(
            p => p.id === Number(productId)
        );

    if (!product) return;


    const newQuantity =
        item.quantity + amount;


    if (newQuantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== Number(productId)
            );

    } else if (
        newQuantity <= product.stock
    ) {

        item.quantity = newQuantity;

    } else {

        showAlert(
            `Solo quedan ${product.stock} unidades disponibles.`,
            "warning"
        );

        return;
    }


    saveCart();

    renderCart();

}


function removeFromCart(productId) {

    const product =
        products.find(
            p => p.id === Number(productId)
        );

    cart =
        cart.filter(
            item => item.id !== Number(productId)
        );

    saveCart();

    renderCart();


    if (product) {

        showAlert(
            `${product.name} eliminado del carrito.`,
            "success"
        );

    }

}


function clearCart() {

    if (!cart.length) return;

    cart = [];

    saveCart();

    renderCart();

    showAlert(
        "Carrito vaciado correctamente.",
        "success"
    );

}


/* =========================================================
   CARRITO — APERTURA / CIERRE TAILWIND
   ========================================================= */

function openCart() {

    const overlay = $("cartOverlay");
    const panel = $("cartPanel");

    if (overlay) {

        overlay.classList.remove(
            "opacity-0",
            "pointer-events-none"
        );

        overlay.classList.add(
            "opacity-100"
        );

    }


    if (panel) {

        panel.classList.remove(
            "translate-x-full"
        );

        panel.classList.add(
            "translate-x-0"
        );

    }


    document.body.classList.add(
        "overflow-hidden"
    );

}


function closeCart() {

    const overlay = $("cartOverlay");
    const panel = $("cartPanel");


    if (overlay) {

        overlay.classList.remove(
            "opacity-100"
        );

        overlay.classList.add(
            "opacity-0",
            "pointer-events-none"
        );

    }


    if (panel) {

        panel.classList.remove(
            "translate-x-0"
        );

        panel.classList.add(
            "translate-x-full"
        );

    }


    document.body.classList.remove(
        "overflow-hidden"
    );

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function sendWhatsApp() {

    if (!cart.length) {

        showAlert(
            "Agregá al menos un producto antes de realizar el pedido.",
            "warning"
        );

        return;
    }


    let message =
        "💪 *SPARTAN FITNESS STORE*%0A" +
        "━━━━━━━━━━━━━━━━━━%0A" +
        "🛒 *NUEVO PEDIDO*%0A%0A";


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) return;


        const subtotal =
            product.price * item.quantity;


        message +=
            `🔥 *${product.name}*%0A` +
            `Cantidad: ${item.quantity}%0A` +
            `Precio: ${formatPrice(product.price)}%0A` +
            `Subtotal: ${formatPrice(subtotal)}%0A%0A`;

    });


    message +=
        "━━━━━━━━━━━━━━━━━━%0A" +
        `💰 *TOTAL: ${formatPrice(getCartTotal())}*%0A%0A` +
        "📍 Quiero coordinar la entrega.%0A" +
        "💪 Spartan Fitness Store";


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   MENÚ MOBILE
   ========================================================= */

function toggleMobileMenu() {

    const menu = $("mobileMenu");

    if (!menu) return;

    menu.classList.toggle("hidden");

}


function closeMobileMenu() {

    const menu = $("mobileMenu");

    if (!menu) return;

    menu.classList.add("hidden");

}


/* =========================================================
   ALERTAS TAILWIND
   ========================================================= */

function showAlert(message, type = "success") {

    const container =
        $("alertContainer");

    if (!container) {

        alert(message);

        return;
    }


    const isSuccess =
        type === "success";

    const isWarning =
        type === "warning";

    const icon =
        isSuccess
            ? "fa-circle-check"
            : isWarning
                ? "fa-triangle-exclamation"
                : "fa-circle-info";


    const iconColor =
        isSuccess
            ? "text-green-400"
            : isWarning
                ? "text-yellow-400"
                : "text-blue-400";


    const borderColor =
        isSuccess
            ? "border-green-500/30"
            : isWarning
                ? "border-yellow-500/30"
                : "border-blue-500/30";


    const alert = document.createElement("div");

    alert.className = `
        alert

        pointer-events-auto

        flex
        items-start
        gap-3

        w-full
        max-w-sm

        rounded-2xl

        border
        ${borderColor}

        bg-zinc-950/95

        px-4
        py-4

        shadow-2xl
        shadow-black/40

        backdrop-blur-xl

        translate-x-full
        opacity-0

        transition-all
        duration-300
    `;


    alert.innerHTML = `

        <i
            class="
                fa-solid
                ${icon}
                ${iconColor}
                mt-0.5
            "
        ></i>

        <p
            class="
                flex-1
                text-sm
                font-bold
                leading-relaxed
                text-white
            "
        >
            ${escapeHTML(message)}
        </p>

        <button
            type="button"
            class="
                text-zinc-600
                transition-colors
                hover:text-white
            "
            aria-label="Cerrar"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

    `;


    container.appendChild(alert);


    requestAnimationFrame(() => {

        alert.classList.remove(
            "translate-x-full",
            "opacity-0"
        );

        alert.classList.add(
            "translate-x-0",
            "opacity-100"
        );

    });


    const removeAlert = () => {

        alert.classList.remove(
            "translate-x-0",
            "opacity-100"
        );

        alert.classList.add(
            "translate-x-full",
            "opacity-0"
        );


        setTimeout(() => {

            alert.remove();

        }, 300);

    };


    const closeButton =
        alert.querySelector("button");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            removeAlert
        );

    }


    setTimeout(
        removeAlert,
        3500
    );

}


/* =========================================================
   CALCULADORA DE MACROS
   ========================================================= */

function calculateMacros() {

    const peso =
        parseFloat(
            $("peso")?.value
        );

    const altura =
        parseFloat(
            $("altura")?.value
        );

    const edad =
        parseInt(
            $("edad")?.value
        );

    const sexo =
        $("sexo")?.value;

    const actividad =
        parseFloat(
            $("actividad")?.value
        );

    const objetivo =
        $("objetivo")?.value;


    /* VALIDACIÓN */

    if (
        !peso ||
        !altura ||
        !edad ||
        !actividad ||
        !objetivo
    ) {

        showAlert(
            "Completá todos los campos de la calculadora.",
            "warning"
        );

        return;
    }


    if (
        peso <= 0 ||
        altura <= 0 ||
        edad <= 0
    ) {

        showAlert(
            "Ingresá valores válidos.",
            "warning"
        );

        return;
    }


    /* =====================================================
       TASA METABÓLICA BASAL
       ===================================================== */

    let bmr;


    if (sexo === "hombre") {

        bmr =
            (10 * peso) +
            (6.25 * altura) -
            (5 * edad) +
            5;

    } else {

        bmr =
            (10 * peso) +
            (6.25 * altura) -
            (5 * edad) -
            161;

    }


    /* =====================================================
       CALORÍAS
       ===================================================== */

    let calories =
        bmr * actividad;


    if (objetivo === "perder") {

        calories *= 0.85;

    } else if (objetivo === "ganar") {

        calories *= 1.15;

    }


    calories =
        Math.max(
            1200,
            Math.round(calories)
        );


    /* =====================================================
       MACROS
       ===================================================== */

    const protein =
        Math.round(peso * 2.2);

    const fat =
        Math.round(peso * 0.8);


    const proteinCalories =
        protein * 4;

    const fatCalories =
        fat * 9;


    const remainingCalories =
        Math.max(
            0,
            calories -
            proteinCalories -
            fatCalories
        );


    const carbs =
        Math.round(
            remainingCalories / 4
        );


    /* =====================================================
       MOSTRAR RESULTADOS
       ===================================================== */

    const resultado =
        $("resultado");


    if (resultado) {

        resultado.classList.remove(
            "hidden"
        );

        resultado.classList.add(
            "block"
        );

        resultado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    /* =====================================================
       ACTUALIZAR VALORES
       ===================================================== */

    if ($("calorias")) {

        $("calorias").textContent =
            `${calories.toLocaleString("es-AR")} kcal`;

    }


    if ($("prote")) {

        $("prote").textContent =
            `${protein} g`;

    }


    if ($("carbs")) {

        $("carbs").textContent =
            `${carbs} g`;

    }


    if ($("grasas")) {

        $("grasas").textContent =
            `${fat} g`;

    }


    /* =====================================================
       CAMPOS EXTRA — SI EXISTEN EN EL HTML
       ===================================================== */

    if ($("protein-calories")) {

        $("protein-calories").textContent =
            `${proteinCalories} kcal`;

    }


    if ($("carbs-calories")) {

        $("carbs-calories").textContent =
            `${carbs * 4} kcal`;

    }


    if ($("fat-calories")) {

        $("fat-calories").textContent =
            `${fatCalories} kcal`;

    }


    if ($("protein-summary")) {

        $("protein-summary").textContent =
            `${protein} g`;

    }


    if ($("carbs-summary")) {

        $("carbs-summary").textContent =
            `${carbs} g`;

    }


    if ($("fat-summary")) {

        $("fat-summary").textContent =
            `${fat} g`;

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    const whatsappMessage =
        `Hola Spartan Fitness Store 💪%0A%0A` +
        `Mi objetivo es: ${objetivo}%0A` +
        `Peso: ${peso} kg%0A` +
        `Altura: ${altura} cm%0A` +
        `Edad: ${edad} años%0A%0A` +
        `🔥 Calorías: ${calories} kcal%0A` +
        `🥩 Proteínas: ${protein} g%0A` +
        `🍚 Carbohidratos: ${carbs} g%0A` +
        `🥑 Grasas: ${fat} g%0A%0A` +
        `Quiero recibir recomendaciones de productos.`;


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;


    const whatsapp =
        $("whatsapp");


    if (whatsapp) {

        whatsapp.href =
            whatsappURL;

        whatsapp.target =
            "_blank";

        whatsapp.rel =
            "noopener noreferrer";

    }


    /* =====================================================
       RECOMENDACIÓN
       ===================================================== */

    renderRecommendation(
        objetivo
    );


    /* =====================================================
       GRÁFICOS
       ===================================================== */

    renderMacroChart(
        protein,
        carbs,
        fat
    );


    renderCalorieChart(
        calories,
        proteinCalories,
        carbs * 4,
        fatCalories
    );


    showAlert(
        "¡Calculadora actualizada correctamente!",
        "success"
    );

}


/* =========================================================
   RECOMENDACIÓN DE PRODUCTOS
   ========================================================= */

function renderRecommendation(objetivo) {

    const container =
        $("recomendacionProducto");

    if (!container) return;


    let recommendedProduct;


    if (objetivo === "ganar") {

        recommendedProduct =
            products.find(
                product => product.id === 1
            );

    } else if (objetivo === "perder") {

        recommendedProduct =
            products.find(
                product => product.id === 12
            );

    } else {

        recommendedProduct =
            products.find(
                product => product.id === 2
            );

    }


    if (!recommendedProduct) {

        container.innerHTML = "";

        return;
    }


    const description =
        objetivo === "ganar"
            ? "Ideal para complementar tu alimentación y alcanzar tus objetivos de proteína."
            : objetivo === "perder"
                ? "Una excelente opción para complementar una alimentación equilibrada."
                : "Una opción práctica para acompañar tu entrenamiento y recuperación.";


    container.innerHTML = `

        <div
            class="
                recommendation

                mt-8

                overflow-hidden

                rounded-2xl

                border
                border-orange-500/20

                bg-gradient-to-br
                from-orange-500/10
                via-zinc-950
                to-black

                shadow-xl
                shadow-orange-500/5
            "
        >

            <div
                class="
                    recommendation-head
                    flex
                    items-center
                    justify-between
                    gap-4
                    border-b
                    border-zinc-800
                    px-5
                    py-4
                "
            >

                <div>

                    <p
                        class="
                            eyebrow
                            text-[10px]
                            font-black
                            uppercase
                            tracking-[0.25em]
                            text-orange-500
                        "
                    >
                        Recomendación Spartan
                    </p>

                    <h3
                        class="
                            mt-1
                            text-lg
                            font-black
                            uppercase
                            text-white
                        "
                    >
                        Producto recomendado
                    </h3>

                </div>

                <i
                    class="
                        fa-solid
                        fa-star
                        text-xl
                        text-orange-500
                    "
                ></i>

            </div>


            <div
                class="
                    recommendation-content
                    grid
                    gap-6
                    p-5
                    md:grid-cols-[160px_1fr]
                    md:items-center
                "
            >

                <!-- IMAGEN -->

                <div
                    class="
                        recommendation-image

                        flex
                        h-40
                        items-center
                        justify-center

                        rounded-2xl

                        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]

                        p-4
                    "
                >

                    <img
                        src="${recommendedProduct.image}"
                        alt="${escapeHTML(recommendedProduct.name)}"
                        class="
                            h-full
                            w-full
                            object-contain
                            transition-transform
                            duration-500
                            hover:scale-110
                        "
                        onerror="
                            this.onerror=null;
                            this.src='./imagenes/imagen-no-disponible.png';
                        "
                    >

                </div>


                <!-- TEXTO -->

                <div>

                    <span
                        class="
                            inline-flex
                            rounded-full
                            bg-orange-500/10
                            px-3
                            py-1
                            text-[10px]
                            font-black
                            uppercase
                            tracking-wider
                            text-orange-500
                        "
                    >
                        ${escapeHTML(recommendedProduct.category)}
                    </span>


                    <h4
                        class="
                            mt-3
                            text-xl
                            font-black
                            uppercase
                            text-white
                        "
                    >
                        ${escapeHTML(recommendedProduct.name)}
                    </h4>


                    <p
                        class="
                            mt-3
                            text-sm
                            leading-relaxed
                            text-zinc-400
                        "
                    >
                        ${description}
                    </p>


                    <div
                        class="
                            recommendation-bottom
                            mt-5
                            flex
                            flex-wrap
                            items-center
                            justify-between
                            gap-4
                        "
                    >

                        <span
                            class="
                                text-2xl
                                font-black
                                text-orange-500
                            "
                        >
                            ${formatPrice(recommendedProduct.price)}
                        </span>


                        <button
                            type="button"
                            class="
                                recommendation-add-btn

                                inline-flex
                                items-center
                                justify-center
                                gap-2

                                rounded-xl

                                bg-orange-500

                                px-4
                                py-2.5

                                text-xs
                                font-black
                                uppercase

                                text-black

                                transition-all
                                duration-300

                                hover:bg-orange-400
                                hover:scale-105

                                active:scale-95
                            "
                            data-product-id="${recommendedProduct.id}"
                        >

                            <i
                                class="fa-solid fa-cart-plus"
                            ></i>

                            Agregar

                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   GRÁFICO DE MACROS
   ========================================================= */

function renderMacroChart(
    protein,
    carbs,
    fat
) {

    const canvas =
        $("macroChart");

    if (!canvas) return;

    if (
        typeof Chart === "undefined"
    ) {

        console.warn(
            "Chart.js no está cargado."
        );

        return;
    }


    if (macroChart) {

        macroChart.destroy();

    }


    macroChart =
        new Chart(
            canvas,
            {
                type: "doughnut",

                data: {

                    labels: [
                        "Proteínas",
                        "Carbohidratos",
                        "Grasas"
                    ],

                    datasets: [
                        {

                            data: [
                                protein,
                                carbs,
                                fat
                            ],

                            backgroundColor: [
                                "#ff6b00",
                                "#ffffff",
                                "#52525b"
                            ],

                            borderColor: "#09090b",

                            borderWidth: 4

                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            position: "bottom",

                            labels: {

                                color: "#ffffff",

                                font: {
                                    family: "Montserrat",
                                    weight: "700"
                                },

                                padding: 20

                            }

                        }

                    }

                }

            }
        );

}


/* =========================================================
   GRÁFICO DE CALORÍAS
   ========================================================= */

function renderCalorieChart(
    calories,
    proteinCalories,
    carbsCalories,
    fatCalories
) {

    const canvas =
        $("calorieChart");

    if (!canvas) return;

    if (
        typeof Chart === "undefined"
    ) {

        return;
    }


    if (calorieChart) {

        calorieChart.destroy();

    }


    calorieChart =
        new Chart(
            canvas,
            {
                type: "bar",

                data: {

                    labels: [
                        "Proteínas",
                        "Carbohidratos",
                        "Grasas"
                    ],

                    datasets: [
                        {

                            label: "Calorías",

                            data: [
                                proteinCalories,
                                carbsCalories,
                                fatCalories
                            ],

                            backgroundColor: [
                                "#ff6b00",
                                "#ffffff",
                                "#52525b"
                            ],

                            borderRadius: 8

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    scales: {

                        x: {

                            ticks: {
                                color: "#a1a1aa"
                            },

                            grid: {
                                display: false
                            }

                        },

                        y: {

                            beginAtZero: true,

                            ticks: {
                                color: "#a1a1aa"
                            },

                            grid: {
                                color: "rgba(255,255,255,0.05)"
                            }

                        }

                    },

                    plugins: {

                        legend: {
                            display: false
                        }

                    }

                }

            }
        );

}


/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {


    /* =====================================================
       PRODUCTOS
       ===================================================== */

    const productGrid =
        $("product-grid");


    if (productGrid) {

        productGrid.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        ".add-product-btn"
                    );

                if (!button) return;


                const productId =
                    Number(
                        button.dataset.productId
                    );


                addToCart(
                    productId
                );

            }
        );

    }


    /* =====================================================
       RECOMENDACIÓN
       ===================================================== */

    const recommendation =
        $("recomendacionProducto");


    if (recommendation) {

        recommendation.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        ".recommendation-add-btn"
                    );

                if (!button) return;


                const productId =
                    Number(
                        button.dataset.productId
                    );


                addToCart(
                    productId
                );

            }
        );

    }


    /* =====================================================
       CARRITO
       ===================================================== */

    const cartItems =
        $("cartItems");


    if (cartItems) {

        cartItems.addEventListener(
            "click",
            (event) => {

                const button =
                    event.target.closest(
                        "[data-action]"
                    );

                if (!button) return;


                const id =
                    Number(
                        button.dataset.id
                    );


                const action =
                    button.dataset.action;


                if (action === "increase") {

                    changeQuantity(
                        id,
                        1
                    );

                }


                if (action === "decrease") {

                    changeQuantity(
                        id,
                        -1
                    );

                }


                if (action === "remove") {

                    removeFromCart(
                        id
                    );

                }

            }
        );

    }


    /* =====================================================
       BOTÓN CARRITO
       ===================================================== */

    const cartButton =
        $("cartButton");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            openCart
        );

    }


    const closeCartButton =
        $("closeCart");


    if (closeCartButton) {

        closeCartButton.addEventListener(
            "click",
            closeCart
        );

    }


    const cartOverlay =
        $("cartOverlay");


    if (cartOverlay) {

        cartOverlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    cartOverlay
                ) {

                    closeCart();

                }

            }
        );

    }


    /* =====================================================
       VACIAR CARRITO
       ===================================================== */

    const clearCartButton =
        $("clearCart");


    if (clearCartButton) {

        clearCartButton.addEventListener(
            "click",
            clearCart
        );

    }


    /* =====================================================
       WHATSAPP
       ===================================================== */

    const checkout =
        $("checkoutWhatsApp");


    if (checkout) {

        checkout.addEventListener(
            "click",
            sendWhatsApp
        );

    }


    /* =====================================================
       MENÚ MOBILE
       ===================================================== */

    const mobileMenuButton =
        $("mobileMenuButton");


    if (mobileMenuButton) {

        mobileMenuButton.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    const mobileMenu =
        $("mobileMenu");


    if (mobileMenu) {

        mobileMenu.addEventListener(
            "click",
            (event) => {

                const link =
                    event.target.closest(
                        "a"
                    );

                if (link) {

                    closeMobileMenu();

                }

            }
        );

    }


    /* =====================================================
       CALCULADORA
       ===================================================== */

    const calculateButton =
        $("btnCalcular");


    if (calculateButton) {

        calculateButton.addEventListener(
            "click",
            calculateMacros
        );

    }


    /* =====================================================
       ENTER EN CALCULADORA
       ===================================================== */

    [
        "peso",
        "altura",
        "edad"
    ].forEach(id => {

        const input =
            $(id);

        if (!input) return;


        input.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    calculateMacros();

                }

            }
        );

    });


    /* =====================================================
       ESC — CERRAR CARRITO / MENÚ
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) return;


            closeCart();

            closeMobileMenu();

        }
    );


    /* =====================================================
       AÑO FOOTER
       ===================================================== */

    const year =
        $("currentYear");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function init() {

    loadProducts();

    loadCart();

    renderProducts();

    renderCart();

    setupEvents();

}


/* =========================================================
   ARRANCAR
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        init
    );

} else {

    init();

}