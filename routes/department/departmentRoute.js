const express = require("express");
const { createDepartment, viewDepartment, viewDepartments, updateDepartment, deleteDepartments, deleteDepartment } = require("../../controller/department/departmentCtrl");

const departmentRoute = express.Router();

//create
departmentRoute.post("/createDepartment",createDepartment)
//view
departmentRoute.get("/viewDepartment/:id",viewDepartment)
departmentRoute.get("/viewDepartments",viewDepartments)
//update
departmentRoute.put("/updateDepartment/:id",updateDepartment)
//delete
departmentRoute.delete("/deleteDepartment/:id",deleteDepartment)
departmentRoute.delete("/deleteDepartments",deleteDepartments)


module.exports = departmentRoute;