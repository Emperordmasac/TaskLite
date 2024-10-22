import {useQueryState, parseAsBoolean} from 'nuqs'

export function useCreateProjecteModal() {
  const [isOpen, setIsOpen] = useQueryState("create-project", parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}))

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)


  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpen
  }
}