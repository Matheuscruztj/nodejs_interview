import { Router } from "express";
import { citiesRoutes } from "./city.routes";

const router = Router();

router.use("/cities", citiesRoutes);

export { router };
