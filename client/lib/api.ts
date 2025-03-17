const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/getTask`)
    if (!response.ok) {
      throw new Error("Failed to fetch tasks")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw error
  }
}

export async function createTask(taskData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/createTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) {
      throw new Error("Failed to create task")
    }
    return await response.json()
  } catch (error) {
    console.error("Error creating task:", error)
    throw error
  }
}

export async function updateTask(id: string, taskData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/updateTask/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })
    if (!response.ok) {
      throw new Error("Failed to update task")
    }
    return await response.json()
  } catch (error) {
    console.error("Error updating task:", error)
    throw error
  }
}

export async function deleteTask(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/deleteTask/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error("Failed to delete task")
    }
    return await response.json()
  } catch (error) {
    console.error("Error deleting task:", error)
    throw error
  }
}

