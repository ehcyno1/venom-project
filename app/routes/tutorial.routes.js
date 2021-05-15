module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    //Create a new Tutorial
    router.post("/", tutorials.create);

    //Retrieve all tutorials
    router.get("/", tutorials.findAll);

    //Rrtrived all published tutorials
    router.get("/published", tutorials.findAllPublished);

    //Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    //Update a Tutoroak with id
    router.put("/:id", tutorials.update);

    //Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    //Delete all tutorials 
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};