import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import { toastError } from 'utils/toastError'

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { ActorService } from '@/services/actor.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useActors = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['Actors list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: String(actor._id),
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastError(error, 'user list')
			},
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		convertStringToQueryKey('create actor'),
		() => ActorService.createActor(),
		{
			onError: (error) => {
				toastError(error, 'create actor')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('create actor', 'creating actor was successful')
				push(getAdminUrl(`actor/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		convertStringToQueryKey('delete actor'),
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastError(error, 'delete actor')
			},
			onSuccess: () => {
				toastr.success('delete actor', 'deleting actor was successful'),
					queryData.refetch()
			},
		}
	)

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTern(event.target.value)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync,
		}),
		[searchTerm, queryData, deleteAsync, createAsync]
	)
}
