const controller = require("../controller/taskController");
const app = require("express");
const router = app.Router();

router.get("/getTask", controller.getTask);
router.post("/createTask", controller.insertTask);
router.put("/updateTask/:id", controller.updateTask);
router.delete("/deleteTask/:id", controller.deleteTask);

module.exports = router;