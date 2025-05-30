const { where } = require("sequelize");
const { Product, Category } = require("../models");
const product = require("../models/product");

const ProductController = {
  async insert(req, res) {
    try {
      if (!req.body.nameProduct || !req.body.price) {
        return res
          .status(400)
          .send({ message: "Título y precio son requeridos" });
      }
      const product = await Product.create(req.body);

      if (req.body.CategoryIds && req.body.CategoryIds.length > 0) {
        const categories = await Category.findAll({
          where: { id: req.body.CategoryIds }
        });

        if (categories.length !== req.body.CategoryIds.length) {
          return res
            .status(404)
            .send({ message: "Algunas categorías no fueron encontradas" });
        }

        await product.addCategories(req.body.CategoryIds);
      }

      const productWithCategories = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "Categories",
            through: { attributes: [] }
          }
        ]
      });

      res.status(201).send(productWithCategories);

    } catch (error) {
      console.error("Error detallado:", error);
      res.status(500).send({
        message: "Error creando producto",
        error: error.message
      });
    }
  }
};

module.exports = ProductController;