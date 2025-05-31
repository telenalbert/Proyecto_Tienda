const { Category } = require('../models/index.js');


const CategoryController = {
    async create(req, res) {
        try {
            const category = await Category.create(req.body);
            res.status(201).send({ msg: 'Category created', category });
        } catch (error) {
            console.log("Error al crear la categoría", error);
            res.status(500).send({ error: 'Error when creating category'});
        }
    },

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

    async getById(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            res.status(200).send(category);
        } catch (error) {
            res.status(500).send({
                msg: "No se ha podido cargar la categoría",
                error: error.message
            });
        }
    },

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
    }
};


module.exports = CategoryController;
