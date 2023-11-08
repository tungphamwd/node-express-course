const express = require("express");
const router = express.Router();

const {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  getTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
