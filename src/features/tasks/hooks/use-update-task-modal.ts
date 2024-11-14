import {useQueryState, parseAsString} from 'nuqs'

export function useUpdateTaskModal() {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString)

  const onOpen = (id: string) => setTaskId(id)
  const onClose = () => setTaskId(null)


  return {
    taskId,
    onOpen,
    onClose,
    setTaskId
  }
}