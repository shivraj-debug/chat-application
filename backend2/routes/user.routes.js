import express from "express"
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar,getSearchUser } from "../controllers/user.controller.js";

const router=express.Router();

router.get('/',protectRoute,getUsersForSidebar);
router.get("/search",protectRoute,getSearchUser);

export default router;
