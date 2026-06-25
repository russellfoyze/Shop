import orderModel from "../models/orderModel.js";

const createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, paymentMethod, items, totalAmount } = req.body;

    if (!customerName || !phone || !address || !paymentMethod || !items || !items.length) {
      return res.json({ success: false, message: "Please provide order details." });
    }

    const order = new orderModel({
      customerName,
      phone,
      address,
      paymentMethod,
      items,
      totalAmount,
      status: "Pending",
    });

    await order.save();
    res.json({ success: true, order, message: "Order created successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.json({ success: false, message: 'Order ID and status are required.' });
    }

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, order, message: 'Order status updated.' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { createOrder, listOrders, updateOrderStatus };
