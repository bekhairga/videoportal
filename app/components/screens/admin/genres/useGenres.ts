import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import { convertMongoDate } from 'utils/date/convertMongoDate'
import { toastError } from 'utils/toastError'

import {
	IAdminTableItem,
	ITableItem,
} from '@/components/ui/admin-table/admin-table.interface'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { GenreService } from '@/services/genre.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useGenres = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
	const queryData = useQuery(
		['Genres list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastError(error, 'genre list')
			},
		}
	)
	const { mutateAsync: createAsync } = useMutation(
		convertStringToQueryKey('create genre'),
		() => GenreService.createGenre(),
		{
			onError: (error) => {
				toastError(error, 'create genre')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('create genre', 'creating genre was successful')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		convertStringToQueryKey('delete genre'),
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastError(error, 'delete genre')
			},
			onSuccess: () => {
				toastr.success('delete genre', 'deleting genre was successful'),
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
