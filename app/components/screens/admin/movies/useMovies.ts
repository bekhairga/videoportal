import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { getGenresList } from 'utils/movie/getGenresListEach'
import { toastError } from 'utils/toastError'

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface'

import { MovieService } from '@/services/movie.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useMovies = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const queryData = useQuery(
		['Movies list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastError(error, 'movie list')
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastError(error, 'delete movie')
			},
			onSuccess: () => {
				toastr.success('delete movie', 'deleting movie was successful'),
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
