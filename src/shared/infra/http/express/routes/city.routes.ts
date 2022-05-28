import { CreateCityController } from "@modules/cities/useCases/CreateCity/CreateCityController";
import { ListCitiesController } from "@modules/cities/useCases/ListCities/ListCitiesController";
import { SearchCitiesController } from "@modules/cities/useCases/SearchCities/SearchCitiesController";
import { Router } from "express";
import { body } from "express-validator";

const citiesRoutes = Router();

const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();
const searchCitiesController = new SearchCitiesController();

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

export { citiesRoutes };
