import { connectToDatabase } from '../../lib/mongodb'
import Task from '../../model/task'

export default async function handler(req, res) {
  await connectToDatabase()

  if (req.method === 'POST') {
    try {
        const newTask = new Task(req.body)
        const savedTask = await newTask.save()
        const response = {
            status: 200,
            message: "Success",
            data: savedTask,
        }
        res.send(response)
    } catch (error) {
        const response = {
            status: 500,
            message: error.message,
            data: "Failed creating new task",
        }
        res.send(response)
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
