const express = require("express");
const { createRole, viewRole, viewRoles, updateRole, deleteRoles, deleteRole } = require("../../controller/role/roleCtrl");

const roleRoute = express.Router();

//create
roleRoute.post("/createRole",createRole)
//view
roleRoute.get("/viewRole/:id",viewRole)
roleRoute.get("/viewRoles",viewRoles)
//update
roleRoute.put("/updateRole/:id",updateRole)
//delete
roleRoute.delete("/deleteRole/:id",deleteRole)
roleRoute.delete("/deleteRoles",deleteRoles)


module.exports = roleRoute;