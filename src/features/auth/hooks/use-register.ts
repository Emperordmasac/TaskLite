import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/rpc';



type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>

export const useRegister = () => {
  const router = useRouter()
  const quryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register["$post"]({ json });
      
      if (!response.ok) {
        toast.error('Failed to register')
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Registered succesfully')
      router.refresh()
      quryClient.invalidateQueries({ queryKey: ['current'] })
    },
    onError: () => {
      toast.error('Failed to register')
    }
  })

  return mutation
}