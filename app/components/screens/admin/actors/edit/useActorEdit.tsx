import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { getKeys } from 'utils/object/getKeys'
import { toastError } from 'utils/toastError'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { ActorService } from '@/services/actor.service'

import { getAdminUrl } from '@/config/url.config'

import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()
	const actorId = String(query.id)
	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError('error', 'Get actor')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		convertStringToQueryKey('update actor'),
		(data: IActorEditInput) => ActorService.updateActor(actorId, data),
		{
			onError: (error) => {
				toastError('error', 'Update actor')
			},
			onSuccess: ({ data }) => {
				toastr.success('update actor', 'successfully updated actor')
				push(getAdminUrl('actors'))
			},
		}
	)
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { isLoading, onSubmit }
}
