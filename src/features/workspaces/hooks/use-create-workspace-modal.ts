import {useQueryState, parseAsBoolean} from 'nuqs'

export function useCreateWorkspaceModal() {
  const [isOpen, setIsOpen] = useQueryState("create-workspace", parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}))

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)


  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpen
  }
}