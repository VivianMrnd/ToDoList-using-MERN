const {task} = require("../model/taskSchema");

let response = {
    status: 200,
    message: "",
    data: ""
}
exports.getTask = async (req, res)=>{
    try {
        const tasks = await task.find().sort({ createdAt: -1 })
        response = {
            status: 200,
            message: "Success",
            data: tasks
        }
        res.send(response)
    } catch (error) {
        response = {
            status: 500,
            message: error.message,
            data: "error data fetching"
        }
    }
}

exports.insertTask = async(req, res)=>{
    try {
        const newTask = new task(req.body)
        const savedTask = await newTask.save()
        response = {
            status: 200,
            message: "Success",
            data: savedTask,
        }
        res.send(response)
    } catch (error) {
        response = {
            status: 500,
            message: error.message,
            data: "Failed creating new task",
        }
        res.send(response)
    }
}

exports.updateTask = async (req, res)=>{
    try {
        const updatedTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" })
        }
        response = {
            status: 200,
            message: "success",
            data: updatedTask,
        }
        res.send(response);
    } catch (error) {
        response = {
            status: 500,
            message: "failed to update",
            data: error.message,
        }
        res.send(response);
    }
}

exports.deleteTask = async(req,res)=>{
    try {
        const tasks = await task.findByIdAndDelete(req.params.id)
        if (!tasks) {
            return res.status(404).json({ message: "Task not found" })
        }
        response = {
            status: 200,
            message: "deleted Successfuully!",
            data: "Deleted",
        }
        res.send(response)
    } catch (error) {
        response = {
            status: 500,
            message: "deleted failed...",
            data: error.message,
        }
        res.send(response)
    }
}