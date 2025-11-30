const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendOrderEmail = require('../utils/sendEmail');

exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });

    // Optional: validate stock
    for (const item of cart.items) {
      if (item.qty > item.product.stock) {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }
    }

    const totalPrice = cart.items.reduce((s, it) => s + it.price * it.qty, 0);
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(i => ({
        product: i.product._id,
        name: i.name,
        size: i.size,
        qty: i.qty,
        price: i.price,
      })),
      totalPrice,
      shippingAddress
    });

    // Optional: reduce stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.qty } });
    }

    // clear cart
    cart.items = [];
    await cart.save();

    // send email (async)
    try {
      await sendOrderEmail(order, req.user);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    res.status(201).json({ order });
  } catch (err) { next(err); }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // only owner can view (simple check)
    if (!order.user._id.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) { next(err); }
};
