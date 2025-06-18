import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,getSearchUser,postProfile } from "../controllers/user.controller.js";

const router=express.Router();

router.get('/',protectRoute,getUsersForSidebar);
router.get("/search",protectRoute,getSearchUser);
router.post("/pic",protectRoute,postProfile);

export default router;
