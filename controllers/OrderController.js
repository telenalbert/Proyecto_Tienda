const { Order } = require('../models/index.js');


const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.status(201).send({ msg: 'Order created', order });
        } catch (error) {
            console.log("Error al crear el pedido", error);
            res.status(500).send({ error: 'Error when creating order', error });
        }
    }
}

module.exports = OrderController;