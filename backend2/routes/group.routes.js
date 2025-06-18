import express from "express";
import { groupgetchat, groupcreatechat, groupgetchatbyid, groupaddmember, groupgetmessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=express.Router();

router.get("/",protectRoute,groupgetchat);
router.post("/",protectRoute,groupcreatechat);
router.get("/:id",protectRoute,groupgetchatbyid);
router.post("/:id/members",protectRoute,groupaddmember);
router.get("/:id/messages",protectRoute,groupgetmessages);

export default router;




