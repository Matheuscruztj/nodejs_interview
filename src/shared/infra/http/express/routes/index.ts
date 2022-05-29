import { Router } from "express";
import { citiesRoutes } from "./city.routes";
import { customersRoutes } from "./customers.router";

const router = Router();

router.use("/cities", citiesRoutes);
router.use("/customers", customersRoutes);

export { router };
