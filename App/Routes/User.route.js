const express = require("express");
const Router = express.Router();

const {create,Update,DeleteApi,getApi,getById,Search} = require("../Controllers/User.controller");

Router.post("/create", create);
Router.post("/update/:id", Update);
Router.post("/delete/:id", DeleteApi);
Router.get("/get", getApi);
Router.get("/get/:id", getById);
Router.post("/search", Search);


module.exports = Router;