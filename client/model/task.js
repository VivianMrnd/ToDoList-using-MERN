import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, default: "other" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Task || mongoose.model('Task', TaskSchema)
