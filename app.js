document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    // 1. Función para cargar los datos del JSON
    async function fetchProducts() {
        try {
            // La ruta es relativa al archivo HTML
            const response = await fetch('data/products.json');
            if (!response.ok) {
                throw new Error(`Error al cargar los datos: ${response.statusText}`);
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Fallo al obtener los productos:', error);
            productList.innerHTML = '<p class="error">No se pudieron cargar los productos. Intente más tarde.</p>';
        }
    }

    // 2. Función para mostrar los productos en el HTML
    function displayProducts(products) {
        productList.innerHTML = ''; // Limpiar el mensaje de "Cargando"

        const activeProducts = products.filter(p => p.activo);
        
        if (activeProducts.length === 0) {
            productList.innerHTML = '<p>No hay productos activos para mostrar en este momento.</p>';
            return;
        }

        activeProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            // Crear el contenido de la tarjeta
            productCard.innerHTML = `
                <img src="${product.imagenUrl}" alt="${product.nombre}" class="product-image">
                <div class="product-info">
                    <h2>${product.nombre}</h2>
                    <p class="description">${product.descripcion}</p>
                    <p class="price">
                        Precio: <span>$${product.precio.toFixed(2)}</span>
                    </p>
                    <p class="product-code">Código: ${product.id}</p>
                    <button class="add-to-cart">Más Información</button>
                </div>
            `;
            
            productList.appendChild(productCard);
        });
    }

    // Iniciar la carga de productos
    fetchProducts();
});
