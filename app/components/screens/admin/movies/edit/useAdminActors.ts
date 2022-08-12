import { useQuery } from '@tanstack/react-query'
import { toastError } from 'utils/toastError'

import { IOptions } from '@/components/ui/form-elements/select/select.interface'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { ActorService } from '@/services/actor.service'

export const useAdminActors = () => {
	const queryData = useQuery(
		convertStringToQueryKey('List of actors'),
		() => ActorService.getAll(''),
		{
			select: ({ data }) =>
				data.map(
					(actor): IOptions => ({
						label: actor.name,
						value: String(actor._id),
					})
				),
			onError: (error) => {
				toastError(error, 'actor list')
			},
		}
	)
	return queryData
}
