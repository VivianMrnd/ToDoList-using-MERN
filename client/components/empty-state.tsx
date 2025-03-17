import { ClipboardList, CheckCircle2, Clock, Briefcase, ShoppingCart, Heart } from "lucide-react"

interface EmptyStateProps {
  activeTab: string
}

export default function EmptyState({ activeTab }: EmptyStateProps) {
  let icon = <ClipboardList className="h-12 w-12 text-muted-foreground/50" />
  let title = "No tasks found"
  let description = "Add a new task to get started."

  switch (activeTab) {
    case "completed":
      icon = <CheckCircle2 className="h-12 w-12 text-muted-foreground/50" />
      title = "No completed tasks"
      description = "Complete a task to see it here."
      break
    case "pending":
      icon = <Clock className="h-12 w-12 text-muted-foreground/50" />
      title = "No pending tasks"
      description = "All caught up! Add more tasks to stay productive."
      break
    case "overdue":
      icon = <Clock className="h-12 w-12 text-rose-500/50" />
      title = "No overdue tasks"
      description = "You're on track! Keep up the good work."
      break
    case "work":
      icon = <Briefcase className="h-12 w-12 text-blue-500/50" />
      title = "No work tasks"
      description = "Add work-related tasks to organize your professional life."
      break
    case "personal":
      icon = <Heart className="h-12 w-12 text-green-500/50" />
      title = "No personal tasks"
      description = "Add personal tasks to keep track of your goals."
      break
    case "shopping":
      icon = <ShoppingCart className="h-12 w-12 text-amber-500/50" />
      title = "No shopping tasks"
      description = "Add items to your shopping list."
      break
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {icon}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

