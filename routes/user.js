import express  from "express";
import  { isAuthenticated }  from "../middlewares/auth.js";
import { register, login,getMyProfile,logout } from "../controllers/user.js";

const router  = express.Router();

//Post Routes
router.post("/register",register);
router.post("/login",login);

router.get("/profile/me",isAuthenticated,getMyProfile);
router.get("/logout",isAuthenticated,logout);

export default router;