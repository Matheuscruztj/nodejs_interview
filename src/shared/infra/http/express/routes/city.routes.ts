import { CreateCityController } from "@modules/cities/useCases/CreateCity/CreateCityController";
import { ListCitiesController } from "@modules/cities/useCases/ListCities/ListCitiesController";
import { SearchCitiesController } from "@modules/cities/useCases/SearchCities/SearchCitiesController";
import { SearchCitiesByNameController } from "@modules/cities/useCases/SearchCitiesByName/SearchCitiesByNameController";
import { SearchCitiesByStateController } from "@modules/cities/useCases/SearchCitiesByState/SearchCitiesByStateController";
import { Router } from "express";
import { body, query } from "express-validator";

const citiesRoutes = Router();

const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();
const searchCitiesController = new SearchCitiesController();
const searchCitiesByNameController = new SearchCitiesByNameController();
const searchCitiesByStateController = new SearchCitiesByStateController();

citiesRoutes.post("/", 
body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage('City name only should have at least 2 characters')
    .isLength({ max: 255 })
    .withMessage('City name only should have at maximum 55 characters'),
body("state")
    .trim()
    .isLength({ min: 2 })
    .withMessage('City state only should have at least 2 characters')
    .isLength({ max: 2 })
    .withMessage('City state only should have at maximum 2 characters')
,createCityController.handle);

citiesRoutes.get("/", listCitiesController.handle);

citiesRoutes.get("/searchByName", 
    query("page")
    .optional()
    .isInt()
        .withMessage('Page only should have to be numeric'),
    query("limit")
    .optional()
    .isInt()
        .withMessage('Page only should have to be numeric')
,searchCitiesByNameController.handle);

citiesRoutes.get("/searchByState",
    query("page")
        .optional()
        .isInt()
            .withMessage('Page only should have to be numeric'),
    query("limit")
    .optional()
    .isInt()
        .withMessage('Page only should have to be numeric')
,searchCitiesByStateController.handle);

export { citiesRoutes };
