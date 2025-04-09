import { connectToDatabase } from '../../lib/mongodb'
import Task from '../../model/task'

export default async function handler(req, res) {
  await connectToDatabase()

  if (req.method === 'PUT') {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.query.id, req.body, { new: true })
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" })
        }
        const response = {
            status: 200,
            message: "success",
            data: updatedTask,
        }
        res.send(response);
    } catch (error) {
        const response = {
            status: 500,
            message: "failed to update",
            data: error.message,
        }
        res.send(response);
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
