import express from "express";
import { sendMessage , getMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.get('/:id',protectRoute,getMessage);
router.post('/send/:id',protectRoute,sendMessage); //here protectRoute is a middleware where it is use for authorization . protectRoute is protected to sendMessage by a unauthrized user
//here params id is receiver id 

export default router;