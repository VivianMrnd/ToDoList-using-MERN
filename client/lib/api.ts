import { crudData } from "./utils";

export async function fetchTasks() {
  return await crudData("getTask")
}
export async function createTask(taskData: any) {
  return await crudData("createTask", "POST",taskData)
}
export async function updateTask(id: string, taskData: any) {
  return await crudData("updateTask", "PUT", taskData, id);
}
export async function deleteTask(id: string) {
  return await crudData("deleteTask", "DELETE","", id);
}

