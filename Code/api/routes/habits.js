import { Router } from "express";
import HabitController from "../controller/HabitController.js";
const router = Router();

router
  .route("/")
  .get(HabitController.getAllHabit)
  .post(HabitController.createHabit);
router.route("/:id").post(HabitController.updateHabit);

export default router;
