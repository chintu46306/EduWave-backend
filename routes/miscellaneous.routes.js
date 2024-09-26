import { Router } from "express";
import {
  contactUs,
  userStats,
} from "../controllers/miscellaneous.controller.js";
import { authorizeRole, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

// {{URL}}/api/v1/
router.route("/contact").post(contactUs);

router
  .route("/admin/stats/users")
  .get(isLoggedIn, authorizeRole("ADMIN"), userStats);

export default router;
