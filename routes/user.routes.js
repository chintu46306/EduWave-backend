import {Router} from "express";  // Require express.Router() from express module 
import {register, login, logout, getProfile} from '../controllers/user.controller.js';  // Require register, login, logout, getProfile from user.controller.js
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();  // Create router


router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);

export default router;  // Export router