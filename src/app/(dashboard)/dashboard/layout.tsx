import Sidebar from "@/components/globals/sidebar"
import { Navbar } from "@/components/globals/navbar"
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal"
import { CreateProjectModal } from "@/features/projects/components/create-project-modal"
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal"
import { UpdateTaskModal } from "@/features/tasks/components/update-task-modal"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTaskModal />
      <UpdateTaskModal />
      <div className="w-full h-full flex">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}
