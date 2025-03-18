const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchData = async (endpoint:any)=>{
  try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }
      return await response.json()
  } catch (error) {
      console.error("Error fetching tasks:", error)
      throw error
  }
}

export async function crudData(endpoint:any, method:any, data:any, id?:string) {
  try {
    const url = id ? `${API_BASE_URL}/${endpoint}/${id}` : `${API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
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