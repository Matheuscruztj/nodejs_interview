import { ChangeCustomerNameController } from "@modules/customers/useCases/ChangeCustomerName/ChangeCustomerNameController";
import { CreateCustomerController } from "@modules/customers/useCases/CreateCustomer/CreateCustomerController";
import { DeleteCustomerByIdController } from "@modules/customers/useCases/DeleteCustomerById/DeleteCustomerByIdController";
import { SearchCustomerByIdController } from "@modules/customers/useCases/SearchCustomerById/SearchCustomerByIdController";
import { SearchCustomersByNameController } from "@modules/customers/useCases/SearchCustomersByName/SearchCustomersByNameController";
import { Router } from "express";
import { body, param, query } from "express-validator";

const createCustomerController = new CreateCustomerController();
const searchCustomerByIdController = new SearchCustomerByIdController();
const searchCustomersByNameController = new SearchCustomersByNameController();
const changeCustomerNameController = new ChangeCustomerNameController();
const deleteCustomerByIdController = new DeleteCustomerByIdController();

const customersRoutes = Router();

customersRoutes.post("/",
body("birth_date")
.isDate()
    .withMessage("Date format should be 'YYYY-MM-DD'"),
body("gender")
.trim().notEmpty()
.withMessage("Gender should not be empty, allowed types: 'MALE' or 'FEMALE'")
,createCustomerController.handle);

customersRoutes.get("/searchUserById",
query("value")
.trim().notEmpty()
    .withMessage("Value should not be empty")
,searchCustomerByIdController.handle);

customersRoutes.get("/searchUserByName",
query("value")
.trim()
.notEmpty()
    .withMessage('Value should not be empty'),
query("page")
    .optional()
    .isInt()
        .withMessage('Page only should have to be numeric'),
query("limit")
.optional()
.isInt()
    .withMessage('Page only should have to be numeric')
,searchCustomersByNameController.handle)

customersRoutes.delete("/:id", deleteCustomerByIdController.handle);

customersRoutes.patch("/:id",
body("name").trim().notEmpty()
    .withMessage("Name should not be empty")
,changeCustomerNameController.handle);

export { customersRoutes };
