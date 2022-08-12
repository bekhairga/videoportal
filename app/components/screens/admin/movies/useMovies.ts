import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { toastr } from 'react-redux-toastr'
import { getGenresList } from 'utils/movie/getGenresListEach'
import { toastError } from 'utils/toastError'

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { MovieService } from '@/services/movie.service'

import { getAdminUrl } from '@/config/url.config'

import { useDebounce } from '../../../../../hooks/useDebounce'

export const useMovies = () => {
	const [searchTerm, setSearchTern] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)
	const { push } = useRouter()
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
	const { mutateAsync: createAsync } = useMutation(
		convertStringToQueryKey('create movie'),
		() => MovieService.createMovie(),
		{
			onError: (error) => {
				toastError(error, 'create movie')
			},
			onSuccess: ({ data: _id }) => {
				toastr.success('create movie', 'creating movie was successful')
				push(getAdminUrl(`movie/edit/${_id}`))
			},
		}
	)
	const { mutateAsync: deleteAsync } = useMutation(
		convertStringToQueryKey('delete movie'),
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
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			createAsync,
			deleteAsync,
		}),
		[searchTerm, queryData, deleteAsync, createAsync]
	)
}
