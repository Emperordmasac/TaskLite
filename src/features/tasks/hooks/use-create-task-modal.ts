import {useQueryState, parseAsBoolean} from 'nuqs'

export function useCreateTaskModal() {
  const [isOpen, setIsOpen] = useQueryState("create-task", parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}))

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)


  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpen
  }
}