
const db = require("../models");
const Tutorial =  db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Tutorial
    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    };
    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
    };



exports.findAll = ( req, res) => {
    const title = req.query.title;
    var condition =title ? {title : {[Op.like]: `%${title}%`}} :null;
    Tutorial.findAll({where : condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

exports.findOne = (req,res) => {
     const id =req.params.id;
     Tutorial.findByPk(id)
     .then(data => {
         if(data){
             res.send(data);
         }else{
             res.status(404).send({
                 mesage:`Error retrieving Tutorial with id=${id}`
             });
         }
     })
     .catch (err => {
         res.status(500).send({
             message: "Error retrieving Tutorial with id="+id
         })
     })
};

exports.update = (req,res) =>{
    const id = req.params.id;
    console.log(req.params)
    Tutorial.update(req.body, {
       where: { id} 
    })
    .then(num => {
        if (num == 1){
            res.send({
                mesage: "Tutorial was updated sucessfully."
            });
        }else {
            res.send({
                message :` cannot upadte Tutorial with id=${id}. Maybe Tutorial was not found.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:`Error updating Tutorial with id= ${id}`
        });
    });

};

exports.delete = (req, res) => {
    const id =req.params.id;
    Tutorial.destroy({
        where:{id : id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message:"Tutorial was deleted sucessfully!"
            });
        }else{
            res.send({
                mesage:`Cannot delete Tutorial with id=${id}.Maybe Tutorial was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            mesage:"Could not delete Tutorial with id"+id
        });
    });
  
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
      where: {},
      truncate:false
  })
  .then(nums => {
      res.send({mesage: `${nums}} Tutorial were this.deleted sucessfully!`});
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while removing all tutorials."
      });
  });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: {published :true}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
  
};