import {Router} from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import {CreateTagController} from "./controllers/CreateTagController";
import {ensureAdmin} from "./middlewares/ensureAdmin";
import { AuthenticaUserController } from "./controllers/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticaUserController();

router.post("/tags", ensureAdmin , createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);


export{router};