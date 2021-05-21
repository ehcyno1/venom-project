const { request, response } = require("express");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? (page-1) * limit : 0;

    return {limit, offset};
};

const getPagingData = (data, page, limit) => {
    const {count:totalItems, rows: tutorials} = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage};
};

// Create and Save a new Tutorial
exports.create = (request, response) => {
    //Validate request
    if(!request.body.title) {
        response.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    };
    const tutorial = {
        title: request.body.title,
        description: request.body.description,
        published: request.body.published ? request.body.published : false
    };
    //Save tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
            response.send(data)
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Some error occurred while crating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (request, response) => {
    const {page, size, title} = request.query;
    console.log(request.query);
    
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;
    console.log(condition);

    const {limit, offset} = getPagination(page, size);

    Tutorial.findAndCountAll({where:condition, limit, offset})
        .then(data => {
            const res = getPagingData(data, page, limit);
            response.send(res);
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Some error occurred while retrieving tutorials."
            });
        });
}

// Find a single Tutorial with an id
exports.findOne = (request, response) => {
    const id = request.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            response.send(data);
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Error retrieving Tutorial with id = " + id
            });
        });
}

// Delete a Tutorial with the specified id in the request
exports.update = (request, response) => {
    const id = request.params.id;

    Tutorial.update(request.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == 1) {
                response.send({
                    message: "Tutorial was updated successfully!"
                });
            } else {
                response.send({
                    message: `Cannot update Tutorial with id=${id}`
                });
            }
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Error updating Tutorial with id=" +id
            });
        });
}

// Delete a Tutorial with the specified id
exports.delete = (request, response) => {
    const id = request.params.id;

    Tutorial.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num == 1) {
                response.send({
                    message: "Tutorial was deleted successfully"
                });
            } else {
                response.send({
                    message: `Cannot delete Tutorial with id=${id}`
                });
            }
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Could not delete Tutorial with id=" + id
            });
        });
}

// Delete all Tutorials from database
exports.deleteAll = (request, response) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            response.send({message: `${nums} Tutorials were deleted successfully`});
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Some error occurred while removing all tutorials"
            });
        });
}

// Find all published Tutorials
exports.findAllPublished = (request, response) => {
    Tutorial.findAll({where: {published: true}})
        .then(data => {
            response.send(data);
        })
        .catch(exception => {
            response.status(500).send({
                message: exception.message || "Some error occurred while retrieving published tutorials"
            });
        });
}