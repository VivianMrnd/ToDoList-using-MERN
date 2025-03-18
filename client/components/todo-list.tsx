"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import TaskItem from "@/components/task-item"
import EmptyState from "@/components/empty-state"
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export type Task = {
  id: string
  title: string
  completed: boolean
  category: string
  priority: "low" | "medium" | "high"
  dueDate?: Date
  createdAt: Date
}

const categories = [
  { name: "work", color: "bg-blue-500" },
  { name: "personal", color: "bg-green-500" },
  { name: "shopping", color: "bg-amber-500" },
  { name: "health", color: "bg-rose-500" },
  { name: "other", color: "bg-purple-500" },
]

const priorities = [
  { name: "low", color: "bg-slate-400" },
  { name: "medium", color: "bg-amber-500" },
  { name: "high", color: "bg-rose-500" },
]

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState<"low" | "medium" | "high">("medium")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true)
        const data = await fetchTasks()
        const formattedTasks = data.data.map((task: any) => ({
          id: task._id,
          title: task.title,
          completed: task.completed,
          category: task.category,
          priority: task.priority,
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          createdAt: new Date(task.createdAt),
        }))
        setTasks(formattedTasks)
      } catch (error) {
        console.error("Failed to fetch tasks", error)
        toast.error("Failed to add task. Please try again.");
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [toast])

  const addTask = async () => {
    if (newTaskTitle.trim() === "") return

    const taskData = {
      title: newTaskTitle,
      category: selectedCategory === "all" ? "other" : selectedCategory,
      priority: selectedPriority,
      dueDate: selectedDate,
    }

    try {
      const newTask = await createTask(taskData)
      const formattedTask = {
        id: newTask.data._id,
        title: newTask.data.title,
        completed: newTask.data.completed,
        category: newTask.data.category,
        priority: newTask.data.priority,
        dueDate: newTask.data.dueDate ? new Date(newTask.data.dueDate) : undefined,
        createdAt: new Date(newTask.data.createdAt),
      }

      setTasks([formattedTask, ...tasks])
      setNewTaskTitle("")
      setSelectedDate(undefined)
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Failed to create task", error)
      toast.error("Failed to add task. Please try again.");
    }
  }

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find((t) => t.id === id)
    if (!task) return

    try {
      await updateTask(id, { completed: !task.completed })
      setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Failed to update task", error)
      toast.error("Failed to add task. Please try again.");
    }
  }

  const deleteTaskHandler = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Failed to delete task", error)
      toast.error("Failed to add task. Please try again.");
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true
    if (activeTab === "completed") return task.completed
    if (activeTab === "pending") return !task.completed
    if (activeTab === "overdue") return !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
    return task.category === activeTab
  })

  const pendingCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.filter((task) => task.completed).length
  const overdueCount = tasks.filter(
    (task) => !task.completed && task.dueDate && new Date(task.dueDate) < new Date(),
  ).length

  return (
    <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm dark:bg-slate-950/90">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Vivian's TaskMaster</span>
          <span className="text-sm font-normal text-muted-foreground">List what is needed to be done!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask()
              }}
              className="flex-1"
            />
            <Button onClick={addTask} size="icon">
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${category.color}`} />
                      <span className="capitalize">{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedPriority}
              onValueChange={(value: "low" | "medium" | "high") => setSelectedPriority(value)}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.name} value={priority.name}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                      <span className="capitalize">{priority.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PP") : "Due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-7 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              Pending
              {pendingCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue" className="flex items-center gap-1">
              Overdue
              {overdueCount > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {overdueCount}
                </Badge>
              )}
            </TabsTrigger>
            {categories.slice(0, 3).map((category) => (
              <TabsTrigger key={category.name} value={category.name} className="hidden md:flex">
                <span className="capitalize">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value={activeTab} className="mt-0">
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : filteredTasks.length > 0 ? (
                  <ul className="space-y-2">
                    <AnimatePresence initial={false}>
                      {filteredTasks.map((task) => (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onToggle={toggleTaskCompletion}
                          onDelete={deleteTaskHandler}
                          categories={categories}
                          priorities={priorities}
                        />
                      ))}
                    </AnimatePresence>
                  </ul>
                ) : (
                  <EmptyState activeTab={activeTab} />
                )}
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
        <div>Total: {tasks.length} tasks</div>
        <div>
          {completedCount} completed • {pendingCount} pending
        </div>
      </CardFooter>
    </Card>
  )
}

