const { Order,Product } = require('../models/index.js');

//CREATE ORDER
const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            res.status(201).send({ msg: 'Order created', order });
        } catch (error) {
            console.log("Error al crear el pedido", error);
            res.status(500).send({ error: 'Error when creating order', error });
        }
    },


// OBTENER TODAS LAS ORDERS JUNTO CON LOS PRODUCTOS
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [Product]
      });
      res.status(200).send(orders);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
      res.status(500).send({
        msg: "No se han podido cargar las órdenes",
        error: error.message
      });
    }
  }
};



module.exports = OrderController;