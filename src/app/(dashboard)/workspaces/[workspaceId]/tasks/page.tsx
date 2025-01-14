import { getCurrent } from "@/features/auth/server/queries"
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher"
import { redirect } from "next/navigation"

const TaskPage = async () => {
  const user = await getCurrent()
  if (!user) redirect("/sign-in")

  return (
    <div className="flex h-full flex-col">
      <TaskViewSwitcher />
    </div>
  )
}
export default TaskPage
