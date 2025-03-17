const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    category: { type: String, default: "other" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
})

exports.task = mongoose.model("task", taskSchema);
