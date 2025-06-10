const { where }                        = require("sequelize");
const { Product, Category, Sequelize } = require("../models");
const { Op }                           = Sequelize
const product                          = require("../models/product");


const ProductController = {
  
  //Controlador CREAR
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
  },


  //Controlador UPDATE
  async update(req, res) {
    try {
      await Product.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            })
        res.send('Producto actualizado con éxito');
      
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "El producto no ha podido ser actualizado"})
    }
        
    },


  //Controlador DELETE
    async delete(req, res) {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.send(
                'El Producto ha sido eliminado con éxito'
            )
        },


  // Controlador GET ALL
  async getAll(req, res) {
        try {
            const product = await Product.findAll({
                include: [{ 
                  model: Category, 
                  as: "Categories",
                  through: {attributes: [] },
                }
                ]
            })
            res.status(200).send(product)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar los productos' })
        }
    },

    //Controlador Get by Price
    async getbyPrice(req,res){
      try {
        const price = parseFloat(req.params.price);
        const product = await Product.findAll({
          where: {
            price: {
                        [Op.eq]: price
                    }
          }
        }
        )
        res.status(200).json(product)
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "No se ha podido encontrar el Producto"})
      }
    },

    //Controlador Ordenar por Precio
    async orderByPrice (req, res){
      try {
        const product = await Product.findAll({
          order: [['price', 'DESC']]
        })
        res.status(200).send(product)
      } catch (error) {
        console.error(error)
        res.status(500).send({ message: "No se ha podido ordenar"})
      }
    },

    // Controlador Get by ID
    async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
              include: [{ 
                  model: Category, 
                  as: "Categories",
                  through: {attributes: [] },
                }
                ]
            })
            res.status(200).send(product)
        } catch (error) {
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    },

    //Controlador Get by NAME
    async getOneByName(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    nameProduct: {
                        [Op.like]: `%${req.params.nameProduct}%`
                    }
                },
                attributes: { exclude: ['OrderId'] },
                include: [{ 
                  model: Category, 
                  as: "Categories",
                  through: {attributes: [] },
                }
                ],
            })
            res.status(200).send(product)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al cargar el producto' })
        }
    },
};

module.exports = ProductController;