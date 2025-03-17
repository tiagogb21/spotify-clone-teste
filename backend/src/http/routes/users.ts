import { Router } from "express";
import { verifyJwt } from "../middlewares/verify-jwt";

import { authenticate } from "../controllers/users/authenticate";
import { profile } from "console";
import { register } from "../controllers/users/register";
import { refresh } from "../controllers/users/refresh";

const router = Router();

router.post("/", register);

router.post("/sessions", authenticate);

router.patch("/token/refresh", refresh);

// Rotas protegidas
router.get("/me", verifyJwt, profile);

export { router as usersRoutes };
