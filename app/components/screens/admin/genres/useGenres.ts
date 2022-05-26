import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { convertMongoDate } from 'utils/date/convertMongoDate'
import { toastError } from 'utils/toastError'

import {
	IAdminTableItem,
	ITableItem,
} from '@/components/ui/admin-table/admin-table.interface'

import { GenreService } from '@/services/genre.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useGenres = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
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
	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
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
		() => ({ handleSearch, ...queryData, searchTerm, deleteAsync }),
		[searchTerm, queryData, deleteAsync]
	)
}
