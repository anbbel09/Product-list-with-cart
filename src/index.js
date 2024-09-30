let cardTab = document.querySelector(".cardTab");
let closeCardTab = document.querySelector(".btnCloseCard");
let listProductHtml = document.querySelector(".listProduct");
let listCart = document.querySelector(".listCart");
let listCartTotal = document.querySelector(".listCartTotal");
let btn = document.querySelector(".btn");
let btnClose = document.querySelector(".btn-close");
let body = document.querySelector("body");
let btnAddCart = document.querySelector(".btn-add");
let btnIncrement = document.querySelector(".btn-increment");
let btnDecrement = document.querySelector(".btn-decrement");
let orderTotal = document.querySelector(".orderTotal");
let count;
let listProduct = [];
let cart = [];


// Función para agregar los productos al DOM
const addDataToHtml = () => {
  listProductHtml.innerHTML = "";

  if (listProduct.length > 0) {
    listProduct.forEach((postre) => {
      let nuevoPostre = document.createElement("div");
      nuevoPostre.classList.add("itemProduct", "w-[210px]", "mx-2", "my-3");
      nuevoPostre.dataset.id = postre.id;
      nuevoPostre.innerHTML = ` 
        <figure class="w-full rounded-md m-auto">
          <img class="rounded-md w-full" src="/assets/images/${postre.image.desktop}" alt="">
        </figure>
        <button class="btn-add w-auto m-auto px-8 py-2 rounded-full my-3 bg-white flex text-center font-text-md border border-orange-700">
          <img class="mr-3 my-auto" src="/assets/images/icon-add-to-cart.svg" alt="">
          Add to cart
        </button>
        <button class="btn hidden my-3 w-auto m-auto px-6 py-2 rounded-full items-center text-white justify-between bg-orange-700 text-center font-text-md">
          <img class="btn-increment w-4 mr-10" src="/assets/images/icon-increment-quantity.svg" alt="">
          <span class="count">0</span>
          <img class="btn-decrement w-4 ml-10" src="/assets/images/icon-decrement-quantity.svg" alt="">
        </button>
        <div class="itemInfo m-auto w-auto">
          <h3 class="font-subtitle text-md my-3 text-gray-500">${postre.category}</h3>
          <h2 class="font-title my-3 text-md">${postre.name}</h2>
          <p class="font-text-md my-3 text-orange-600 text-md">Price ${postre.price}</p>
        </div>`;
      
      listProductHtml.appendChild(nuevoPostre);
    });
  }
};

// Evento para manejar clicks en los botones de los productos
listProductHtml.addEventListener("click", (event) => {
  let positionClick = event.target;
  let postre_id;
  let count = 1;
  let countElement; // Valor inicial predeterminado para count

  if (positionClick.classList.contains('btn-add')) {
    postre_id = positionClick.parentElement.dataset.id;
    agregarAlCarrito(postre_id, count); // Se pasa count = 1 al agregar por primera vez
  }

  let btnContainer = positionClick.closest(".itemProduct");
  let btn = btnContainer.querySelector(".btn");

  if (positionClick.parentElement.dataset.id) {
    cardTab.style.display = "block";
    positionClick.style.display = "none";
    btn.style.display = "block";
    btn.style.display = "flex";
  }

  if (positionClick.classList.contains('btn-increment')) {
    // Encuentra el contenedor más cercano que contiene tanto el botón como el contador
    let container = positionClick.closest('.itemProduct'); 
    
    // Busca específicamente el contador dentro de ese contenedor
    let countElement = container.querySelector('.count');
    
    // Incrementa solo si el contador pertenece al mismo contenedor que el botón
    if (countElement) {
      count = parseInt(countElement.textContent) + 1;
      countElement.textContent = count;

      let postre_id = container.dataset.id;
      agregarAlCarrito(postre_id, count); // Obtén el ID del postre para pasarlo
    } 
  } 
  
  if (positionClick.classList.contains('btn-decrement')) {
    let container = positionClick.closest('.itemProduct'); 
    
    let countElement = container.querySelector('.count');
    
    if (countElement) {
      count = parseInt(countElement.textContent) - 1;
      
      if (count >= 0) {
        countElement.textContent = count;
      }
    }
    let postre_id = container.dataset.id;
    agregarAlCarrito(postre_id, count); // Actualiza la cantidad en el carrito
}




});


// Función para agregar productos al carrito
const agregarAlCarrito = (postre_id, count) => {
  
  let positionThisProductInCart = cart.findIndex((value) => value.product_id == postre_id);

  if (positionThisProductInCart < 0) {
    // Si el producto no está en el carrito, se añade con la cantidad pasada (1 o más)
    cart.push({
      product_id: postre_id,
      quantity: count
    });
  } else { 
    
    cart[positionThisProductInCart].quantity = count;

  }  

  console.log(cart); // Muestra el carrito actualizado

  addCartToHtml(); // Actualizar la vista del carrito
};


// Función para mostrar el carrito en el HTML
const addCartToHtml = () => {
  if (cart.length > 0) {
    listCart.innerHTML = ''; // Limpia el contenido anterior del carrito

    cart.forEach((cartItem) => {
      // Busca el producto en listProduct por su `id`
      let posicionProducto = listProduct.findIndex((product) => product.id == cartItem.product_id);
      if (posicionProducto >= 0) {
        let info = listProduct[posicionProducto];   
        let nuevoCarrito = document.createElement("div");
        nuevoCarrito.setAttribute('data-product-id', cartItem.product_id);
        nuevoCarrito.classList.add("postre", "flex", "justify-between");

        // Agrega la información del producto al HTML del carrito
        nuevoCarrito.innerHTML = `
          <div class="listCartInfo my-3">
            <h2 class="font-title my-3 text-lg">${info.name}</h2>
            <h3 class="font-text-md">Quantity: <span class="text-orange-600 font-text-md">x${cartItem.quantity}</span></h3>
            <p class="font-text-md my-3 text-md">Price $${info.price * cartItem.quantity}</p>
          </div>
          <div class="btnCloseContainer my-3">
            <button class="btn-close" data-product-id="${cartItem.product_id}">
              <img class="w-4 mt-5" src="/assets/images/icon-remove-item.svg" alt="Remove">
            </button>
          </div>
        `;

        
        listCart.appendChild(nuevoCarrito);
      } else {
        console.error(`Producto con ID ${cartItem.product_id} no encontrado en listProduct`);
      }
    });
  }
};



cardTab.addEventListener('click', (e) => {
  // Obtén el elemento en el que se hizo clic
  let positionClick = e.target;

  // Verifica si el elemento tiene la clase 'btn-close'
  if (positionClick.classList.contains('btn-close')) {

    // Encuentra el contenedor padre que contiene el btn y btn-close
    let padreClick = positionClick.closest('.postre');  // Aquí busca el contenedor relacionado al producto

    if (padreClick) {
      let productId = padreClick.getAttribute('data-product-id'); // ID del producto del carrito

      // Ahora encuentra el contenedor del producto en el listado de productos (fuera del carrito)
      let btnContainer = document.querySelector(`.itemProduct[data-id='${productId}']`); // Encuentra el itemProduct que coincide con el productId
      
      if (btnContainer) {
        // Obtiene los botones dentro del contenedor correcto
        let btn = btnContainer.querySelector('.btn');
        let btnAddCart = btnContainer.querySelector('.btn-add');

        if (btn && btnAddCart) {
          // Oculta el botón 'btn' y muestra el 'btn-add'
          btn.style.display = 'none';
          btnAddCart.style.display = 'block';
          btnAddCart.style.display = 'flex';
        } else {
          console.error('No se encontraron los botones dentro del contenedor.');
        }

        // Luego, elimina el producto del carrito
        let productIndex = cart.findIndex(item => item.product_id == productId);

        if (productIndex >= 0) {
          cart.splice(productIndex, 1); // Elimina el producto del array del carrito
          padreClick.remove(); // Remueve el elemento visualmente del carrito

          // Verifica si el carrito está vacío y muestra un mensaje si es necesario
          if (cart.length === 0) {
            listCart.innerHTML = `<p class="font-text-md">El carrito está vacío</p>`;
          }

          console.log('Producto eliminado:', cart);
        } else {
          console.error('Producto no encontrado en el carrito');
        }

      } else {
        console.error('No se encontró el contenedor del producto en el listado de productos.');
      }
    }
  }

  if (positionClick.classList.contains('btnCloseCard')) {
    console.log('hola');
    
  }
});



// Función para cargar los productos desde un archivo JSON
const agregarProductos = () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      listProduct = data; // Almacena los productos en listProduct
      addDataToHtml(); // Añade los productos al HTML
    })
    .catch((error) => console.error('Error al cargar los productos:', error));
};

agregarProductos(); // Llama a la función para cargar productos
