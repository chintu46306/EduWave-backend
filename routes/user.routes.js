import {Router} from "express";  // Require express.Router() from express module 
import {register, login, logout, getProfile} from '../controllers/user.controller.js';  // Require register, login, logout, getProfile from user.controller.js


const router = Router();  // Create router


router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', getProfile);

export default router;  // Export router