import { CreateCityController } from "@modules/cities/useCases/CreateCity/CreateCityController";
import { SearchCitiesByNameController } from "@modules/cities/useCases/SearchCitiesByName/SearchCitiesByNameController";
import { SearchCitiesByStateController } from "@modules/cities/useCases/SearchCitiesByState/SearchCitiesByStateController";
import { Router } from "express";
import { body, query } from "express-validator";

const citiesRoutes = Router();

const createCityController = new CreateCityController();
const searchCitiesByNameController = new SearchCitiesByNameController();
const searchCitiesByStateController = new SearchCitiesByStateController();

citiesRoutes.post("/", 
body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage('City name only should have at least 2 characters')
    .isLength({ max: 255 })
    .withMessage('City name only should have at maximum 255 characters'),
body("state")
    .trim()
    .isLength({ min: 2 })
    .withMessage('City state only should have at least 2 characters')
    .isLength({ max: 2 })
    .withMessage('City state only should have at maximum 2 characters')
,createCityController.handle);

citiesRoutes.get("/searchByName",
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
        .withMessage('Limit only should have to be numeric')
,searchCitiesByNameController.handle);

citiesRoutes.get("/searchByState",
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
        .withMessage('Limit only should have to be numeric')
,searchCitiesByStateController.handle);

export { citiesRoutes };
