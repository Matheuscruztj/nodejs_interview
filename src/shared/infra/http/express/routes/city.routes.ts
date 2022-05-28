import { CreateCityController } from "@modules/cities/useCases/CreateCity/CreateCityController";
import { ListCitiesController } from "@modules/cities/useCases/ListCities/ListCitiesController";
import { SearchCitiesController } from "@modules/cities/useCases/SearchCities/SearchCitiesController";
import { SearchCitiesByNameController } from "@modules/cities/useCases/SearchCitiesByName/SearchCitiesByNameController";
import { SearchCitiesByStateController } from "@modules/cities/useCases/SearchCitiesByState/SearchCitiesByStateController";
import { Router } from "express";
import { body } from "express-validator";

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
    .withMessage('City name only shoud have at least 2 characters')
    .isLength({ max: 255 })
    .withMessage('City name only shoud have at maximum 55 characters'),
body("state")
    .trim()
    .isLength({ min: 2 })
    .withMessage('City state only shoud have at least 2 characters')
    .isLength({ max: 2 })
    .withMessage('City state only shoud have at maximum 2 characters')
,createCityController.handle);

citiesRoutes.get("/", listCitiesController.handle);
citiesRoutes.get("/search", searchCitiesController.handle);
citiesRoutes.get("/searchByName", searchCitiesByNameController.handle);
citiesRoutes.get("/searchByState", searchCitiesByStateController.handle);

export { citiesRoutes };
