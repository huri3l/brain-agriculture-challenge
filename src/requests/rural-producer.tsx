import { useAppDispatch } from '@/hooks/use-redux'
import { request } from '@/lib/api'
import { setRuralProducers } from '@/store/rural-producer-slice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  CreateRuralProducerMutationData,
  DeleteRuralProducerMutationData,
  RuralProducerResponse,
  UpdateRuralProducerMutationData
} from './types'

export const useRuralProducers = () => {
  const dispatch = useAppDispatch()
  return useQuery({
    queryKey: ['rural-producers'],
    queryFn: async () => {
      const data = await request<RuralProducerResponse>('/rural_producer')
      dispatch(setRuralProducers(data));
      return data
    },
    staleTime: 5 * 1000
  })
}

export const useCreateRuralProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRuralProducerMutationData) => {
      return request('/rural_producer', {
        method: 'POST',
        body: data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rural-producers']
      })
      toast.success('Produtor rural cadastrado com sucesso!')
    },
    onError: () => {
      toast.error('Houve um erro ao cadastrar o produtor rural. Tente novamente mais tarde.')
    }
  })
}

export const useUpdateRuralProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateRuralProducerMutationData) => {
      return request(`/rural_producer/${data.id}`, {
        method: 'PATCH',
        body: data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rural-producers']
      })
      toast.success('Produtor rural atualizado com sucesso!')
    },
    onError: () => {
      toast.error('Houve um erro ao atuaalizar o produtor rural. Tente novamente mais tarde.')
    }
  })
}

export const useDeleteRuralProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id
    }: DeleteRuralProducerMutationData) => {
      return request(`/rural_producer/${id}`, {
        method: 'DELETE',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['rural-producers']
      })
      toast.success('Produtor rural deletado com sucesso!')
    },
    onError: () => {
      toast.error('Houve um erro ao deletar o produtor rural. Tente novamente mais tarde.')
    }
  })
}
