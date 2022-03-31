import express from "express";
import { tokenCheck, isAdmin } from "../../middleware/token_check";
import events from "./events/personal_events";

const router = express.Router();

router.get("/login", events.login);
router.get("/personals", tokenCheck, isAdmin, events.personalList);
router.get("/personals/:username", isAdmin, tokenCheck, events.showPersonal);
router.post("/personal", tokenCheck, isAdmin, events.createPersonal);
router.put("/personal", tokenCheck, isAdmin, events.updatePersonal);
router.delete("/personal", tokenCheck, isAdmin, events.deletePersonal);

export default router;
