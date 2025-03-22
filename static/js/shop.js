// Product Data (Expanded)
const products = {
    equipment: [
        { id: 'e1', name: 'Premium Dumbbells Set', price: 12999, image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800', category: 'equipment', badge: 'Best Seller', rating: 4.8, reviews: 156 },
        { id: 'e2', name: 'Olympic Barbell', price: 15999, image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800', category: 'equipment', badge: 'Premium', rating: 4.9, reviews: 98 },
        { id: 'e3', name: 'Power Rack', price: 45999, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', category: 'equipment', badge: 'New', rating: 4.7, reviews: 45 },
        { id: 'e4', name: 'Adjustable Kettlebell', price: 4999, image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800', category: 'equipment', badge: 'Hot', rating: 4.5, reviews: 30 },
        { id: 'e5', name: 'Resistance Bands Set', price: 2999, image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=800', category: 'equipment', badge: 'Popular', rating: 4.6, reviews: 50 },
        { id: 'e6', name: 'Treadmill Pro', price: 59999, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800', category: 'equipment', badge: 'New', rating: 4.8, reviews: 70 }
    ],
    supplements: [
        { id: 's1', name: 'Whey Protein Isolate', price: 2999, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800', category: 'supplements', badge: 'Top Rated', rating: 4.9, reviews: 342 },
        { id: 's2', name: 'Pre-Workout Energy', price: 1999, image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800', category: 'supplements', badge: 'Popular', rating: 4.7, reviews: 189 },
        { id: 's3', name: 'Creatine Monohydrate', price: 2499, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800', category: 'supplements', badge: 'Top Rated', rating: 4.8, reviews: 200 },
        { id: 's4', name: 'BCAA Powder', price: 1999, image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800', category: 'supplements', badge: 'Popular', rating: 4.7, reviews: 150 },
        { id: 's5', name: 'Vitamin D3 Supplement', price: 999, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800', category: 'supplements', badge: 'Essential', rating: 4.6, reviews: 120 }
    ],
    accessories: [
        { id: 'a1', name: 'Weight Lifting Belt', price: 1999, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', category: 'accessories', badge: 'Support', rating: 4.8, reviews: 189 },
        { id: 'a2', name: 'Gym Gloves', price: 999, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', category: 'accessories', badge: 'Support', rating: 4.5, reviews: 100 },
        { id: 'a3', name: 'Foam Roller', price: 1499, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', category: 'accessories', badge: 'Essential', rating: 4.6, reviews: 80 },
        { id: 'a4', name: 'Knee Wraps', price: 1299, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800', category: 'accessories', badge: 'Support', rating: 4.7, reviews: 90 }
    ],
    clothing: [
        { id: 'c1', name: 'Training Tank Top', price: 699, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', category: 'clothing', badge: 'Summer', rating: 4.6, reviews: 89 },
        { id: 'c2', name: 'Training Shorts', price: 799, image: 'https://images.unsplash.com/photo-1588185505872-d697563a3705?w=800', category: 'clothing', badge: 'Comfortable', rating: 4.7, reviews: 156 },
        { id: 'c3', name: 'Compression Tights', price: 1299, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', category: 'clothing', badge: 'Comfortable', rating: 4.7, reviews: 120 },
        { id: 'c4', name: 'Sports Bra', price: 899, image: 'https://images.unsplash.com/photo-1588185505872-d697563a3705?w=800', category: 'clothing', badge: 'Support', rating: 4.8, reviews: 90 },
        { id: 'c5', name: 'Running Jacket', price: 1999, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', category: 'clothing', badge: 'Weatherproof', rating: 4.7, reviews: 110 }
    ],
    nutrition: [
        { id: 'n1', name: 'Meal Replacement Shake', price: 1999, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800', category: 'nutrition', badge: 'Healthy', rating: 4.7, reviews: 200 },
        { id: 'n2', name: 'Protein Bars', price: 999, image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800', category: 'nutrition', badge: 'Snack', rating: 4.6, reviews: 150 },
        { id: 'n3', name: 'Energy Gel Packs', price: 1499, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800', category: 'nutrition', badge: 'Endurance', rating: 4.5, reviews: 90 }
    ],
    recovery: [
        { id: 'r1', name: 'Massage Gun', price: 4999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'recovery', badge: 'Premium', rating: 4.8, reviews: 100 },
        { id: 'r2', name: 'Yoga Mat', price: 1499, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'recovery', badge: 'Essential', rating: 4.7, reviews: 80 },
        { id: 'r3', name: 'Therapy Ice Pack', price: 999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'recovery', badge: 'Support', rating: 4.6, reviews: 60 }
    ],
    tech: [
        { id: 't1', name: 'Wireless Earbuds', price: 7999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'tech', badge: 'Premium', rating: 4.7, reviews: 176 },
        { id: 't2', name: 'Smart Fitness Watch', price: 7999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'tech', badge: 'Premium', rating: 4.9, reviews: 150 },
        { id: 't3', name: 'Bluetooth Body Fat Scale', price: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'tech', badge: 'Smart', rating: 4.6, reviews: 120 },
        { id: 't4', name: 'Heart Rate Monitor', price: 3999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800', category: 'tech', badge: 'Essential', rating: 4.7, reviews: 90 }
    ]
};

// Cart State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setupEventListeners();
    adjustLayoutForHeader();
});

// Adjust layout for header
function adjustLayoutForHeader() {
    const header = document.querySelector('.shop-header-wrapper');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = `${headerHeight}px`;
        console.log(`Header height adjusted to: ${headerHeight}px`);
    }
}

// Display Products
function displayProducts(category = 'all', sort = 'featured', search = '') {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    let filteredProducts = Object.values(products).flat();
    if (category !== 'all') filteredProducts = products[category] || [];
    if (search) filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    filteredProducts.sort((a, b) => {
        switch (sort) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            default: return 0;
        }
    });

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
            <div class="product-details">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayProducts(btn.dataset.category);
        });
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        displayProducts(document.querySelector('.filter-btn.active').dataset.category, 'featured', e.target.value);
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
        displayProducts(document.querySelector('.filter-btn.active').dataset.category, e.target.value);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = Object.values(products).flat().find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} x ${item.quantity} = ₹${itemTotal.toLocaleString('en-IN')}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></button>
        `;
        cartItems.appendChild(itemElement);
        total += itemTotal;
    });

    document.querySelector('.total-amount').textContent = `₹${total.toLocaleString('en-IN')}`;
    document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // If cart is empty, close the sidebar
    if (cart.length === 0) {
        toggleCart();
    }
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        if (item.quantity === 0) {
            removeFromCart(productId); // Remove item if quantity reaches 0
        } else {
            updateCart();
            showNotification(`Quantity updated for ${item.name}!`);
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        showNotification('Item removed from cart!');
        // Close cart sidebar after removal
        toggleCart();
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Toggle Cart
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// Initial Load
displayProducts();