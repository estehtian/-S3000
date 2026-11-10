(() => {
  const KEY = 's3000-cart';
  const readCart = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch { return []; }
  };
  const saveCart = (cart) => localStorage.setItem(KEY, JSON.stringify(cart));
  const refreshCount = () => {
    const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((el) => { el.textContent = count; });
  };
  const showToast = (message) => {
    const toast = document.querySelector('[data-toast]');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2400);
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button) return;
    const name = button.dataset.product;
    const price = Number(button.dataset.price);
    if (!name || !Number.isFinite(price) || price < 0) return;
    const cart = readCart();
    const existing = cart.find((item) => item.name === name);
    if (existing) existing.quantity += 1;
    else cart.push({ name, price, quantity: 1 });
    saveCart(cart);
    refreshCount();
    showToast(`${name} ditambahkan ke keranjang`);
  });
  refreshCount();
})();
