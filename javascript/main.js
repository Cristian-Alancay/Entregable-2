let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name: product, quantity: 1 });
    }
    updateCartDisplay();
    saveCart();
}

function removeFromCart(product) {
    cart = cart.map(item => {
        if (item.name === product) {
            item.quantity--;
        }
        return item;
    }).filter(item => item.quantity > 0);
    updateCartDisplay();
    saveCart();
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Cantidad: ${item.quantity}`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(item.name);
        
        listItem.appendChild(removeButton);
        cartItems.appendChild(listItem);
    });
}

function finalizePurchase() {
    if (cart.length === 0) {
        displayMessage('El carrito está vacío.');
        return;
    }
    displayMessage('Compra finalizada. Gracias por su compra!');
    cart = [];
    updateCartDisplay();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayMessage(message) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.textContent = message;
    setTimeout(() => {
        messageContainer.textContent = '';
    }, 3000);
}

document.getElementById('finalize-purchase').addEventListener('click', finalizePurchase);

updateCartDisplay();