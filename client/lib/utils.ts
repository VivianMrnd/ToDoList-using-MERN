const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function crudData(endpoint: string, method?: string, data?: any, id?: string) {
  try {
    const url = id ? `${API_BASE_URL}/${endpoint}?id=${id}` : `${API_BASE_URL}/${endpoint}`;
    const options: RequestInit = {
      method: method || "GET", 
      ...(method && method !== "GET" ? {
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
      } : {}),
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to ${method || "GET"} data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error during ${method || "GET"} request:`, error);
    throw error;
  }
}