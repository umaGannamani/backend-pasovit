const Cart = require('../models/Cart');
const Product = require('../models/Product');

// -----------------------------
// GET CART
// -----------------------------
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) {
    console.error('Get cart error:', err);
    next(err);
  }
};

// -----------------------------
// ADD TO CART
// -----------------------------
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, qty = 1, size } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      i => i.product.equals(product._id) && i.size === size
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].qty += Number(qty);
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        size,
        qty: Number(qty),
        price: product.price
      });
    }

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error('Add to cart error:', err);
    next(err);
  }
};

// -----------------------------
// UPDATE CART ITEM
// -----------------------------
exports.updateCartItem = async (req, res, next) => {
  try {
    const { itemId, qty } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.qty = Number(qty);
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    console.error('Update cart item error:', err);
    next(err);
  }
};

// -----------------------------
// REMOVE CART ITEM (FIXED)
// -----------------------------
exports.removeCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Find index inside array
    const index = cart.items.findIndex(
      item =>
        item._id.toString() === itemId ||
        (item.product && item.product.toString() === itemId)
    );

    if (index === -1)
      return res.status(404).json({ message: 'Item not found' });

    // SAFE REMOVE
    cart.items.splice(index, 1);

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error('Remove cart item error:', err);
    next(err);
  }
};

// -----------------------------
// MERGE GUEST CART
// -----------------------------
exports.mergeCart = async (req, res, next) => {
  try {
    const guestItems = req.body.items || [];
    if (!Array.isArray(guestItems) || guestItems.length === 0)
      return res.status(200).json({ message: 'Nothing to merge' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    guestItems.forEach((gItem) => {
      const existing = cart.items.find(
        item =>
          item.product.equals(gItem.product) &&
          item.size === gItem.size
      );
      if (existing) existing.qty += gItem.qty;
      else
        cart.items.push({
          product: gItem.product,
          name: gItem.name,
          size: gItem.size,
          qty: gItem.qty,
          price: gItem.price,
        });
    });

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    console.error('Merge cart error:', err);
    next(err);
  }
};
