const { Category, Product } = require('../models/index.js');


//CREATE
const CategoryController = {
  async create(req, res) {
    try {
      const category = await Category.create(req.body);
      res.status(201).send({ msg: 'Category created', category });
    } catch (error) {
      console.log("Error al crear la categoría", error);
      res.status(500).send({ error: 'Error when creating category' });
    }
  },


//UPDATE
  async update(req, res) {
    try {
      await Category.update(req.body, {
        where: { id: req.params.id }
      });
      res.status(200).send({ msg: "Categoría actualizada con éxito" });
    } catch (error) {
      res.status(500).send({
        msg: "La categoría no se ha podido actualizar",
        error: error.message
      });
    }
  },


 //DELETE
  async delete(req, res) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      res.send("La categoría se ha eliminado");
    } catch (error) {
      res.status(500).send({
        msg: "La categoría no se pudo eliminar",
        error: error.message
      });
    }
  },

  //OBTENER POR ID
  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id, {
        include: [{
          model: Product,
          as: "Products",
          through: { attributes: [] }
        }]
      });
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({
        msg: "No se ha podido cargar la categoría",
        error: error.message
      });
    }
  },


//GET BY NAME
  async getByName(req, res) {
    try {
      const { name } = req.query;

      const category = await Category.findOne({
        where: {
          nameCategory: name
        }
      });

      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({
        msg: "Error al buscar la categoría"
      });
    }
  },

  // OBTENER TODAS LAS CATEGORÍAS CON SUS PRODUCTOS
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            as: "Products",
            through: { attributes: [] } 
          }
        ]
      });
      res.status(200).send(categories);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      res.status(500).send({
        msg: "No se han podido cargar las categorías",
        error: error.message
      });
    }
  }
};

module.exports = CategoryController;