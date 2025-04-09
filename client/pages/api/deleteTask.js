import { connectToDatabase } from '../../lib/mongodb'
import Task from '../../model/task'

export default async function handler(req, res) {  
  await connectToDatabase()

  if (req.method === 'DELETE') {
    try {
        const tasks = await Task.findByIdAndDelete(req.query.id)
        if (!tasks) {
            return res.status(404).json({ message: "Task not found" })
        }
        const response = {
            status: 200,
            message: "deleted Successfuully!",
            data: "Deleted",
        }
        res.send(response)
    } catch (error) {
        const response = {
            status: 500,
            message: "deleted failed...",
            data: error.message,
        }
        res.send(response)        
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
