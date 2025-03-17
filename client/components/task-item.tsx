"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import { Trash2, Edit2, Save, X, Calendar, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Task } from "@/components/todo-list"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  categories: { name: string; color: string }[]
  priorities: { name: string; color: string }[]
}

export default function TaskItem({ task, onToggle, onDelete, categories, priorities }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const categoryColor = categories.find((c) => c.name === task.category)?.color || "bg-gray-500"
  const priorityColor = priorities.find((p) => p.name === task.priority)?.color || "bg-gray-500"

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(task.title)
    setIsEditing(false)
  }

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-center justify-between p-3 rounded-lg border",
        task.completed ? "bg-slate-50 dark:bg-slate-900/50" : "bg-white dark:bg-slate-900",
        isOverdue ? "border-rose-200 dark:border-rose-900" : "border-slate-200 dark:border-slate-800",
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className={cn(task.completed && "bg-green-500 border-green-500")}
        />

        {isEditing ? (
          <Input value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="flex-1" autoFocus />
        ) : (
          <div className="flex flex-col min-w-0">
            <span className={cn("font-medium truncate", task.completed && "line-through text-muted-foreground")}>
              {task.title}
            </span>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              {task.dueDate && (
                <div className={cn("flex items-center gap-1", isOverdue && "text-rose-500 dark:text-rose-400")}>
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(task.dueDate), "MMM d")}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${categoryColor}`} />
                <span className="capitalize">{task.category}</span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span className="capitalize">{task.priority}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Priority: {task.priority}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {isEditing ? (
          <>
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </motion.li>
  )
}

