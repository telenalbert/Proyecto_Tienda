const { Order,Product } = require('../models/index.js');

//CREATE ORDER
const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            if (req.body.ProductIds && req.body.ProductIds.length > 0) {
        const products = await Product.findAll({
          where: { id: req.body.ProductIds }
        });

        if (products.length !== req.body.ProductIds.length) {
          return res
            .status(404)
            .send({ message: "Algunos productos no fueron encontrados" });
        }

        await Product.update(
          { orderId: order.id },
          { where: { id: req.body.ProductIds } }
        );
      }
          const ordertWithProducts = await Order.findByPk(order.id, {
            include: [
              {
                model: Product,
                as: "Products",
              }
            ]
          });

          res.status(201).send(ordertWithProducts);

            //res.status(201).send({ msg: 'Order created', order });
        } catch (error) {
            console.log("Error al crear el pedido", error);
            res.status(500).send({ error: 'Error when creating order', error });
        }
    },


// OBTENER TODAS LAS ORDERS JUNTO CON LOS PRODUCTOS
  async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
        {
          model: Product,
          as: 'Products'
        }
      ]
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