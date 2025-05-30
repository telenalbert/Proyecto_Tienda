const {Category} = require("../models");

const CategoryController = {
    async insert(req, res) {
        try {
            const category = await Category.create({
                nameCategory: req.body.nameCategory,
                descriptionCategory: req.body.descriptionCategory
            });
            res.status(201).send({ message: "Categoría Creada con éxito!", category})
    
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error al crear la Categoría", error})
        }
    }
}

module.exports = CategoryController