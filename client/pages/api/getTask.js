import { connectToDatabase } from '../../lib/mongodb'
import Task from '../../model/task'

export default async function handler(req, res) {
  await connectToDatabase()

  if (req.method === 'GET') {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 })
      return res.status(200).json({
        status: 200,
        message: 'Success',
        data: tasks
      })
    } catch (error) {
      
      return res.status(500).json({
        status: 500,
        message: error.message,
        data: 'error data fetching'
      })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
