import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'
import { getKeys } from 'utils/object/getKeys'
import { toastError } from 'utils/toastError'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { MovieService } from '@/services/movie.service'

import { getAdminUrl } from '@/config/url.config'

import { IMovieEditInput } from './movie-edit.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()
	const movieId = String(query.id)
	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError('error', 'Get movie')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		convertStringToQueryKey('update movie'),
		(data: IMovieEditInput) => MovieService.updateMovie(movieId, data),
		{
			onError: (error) => {
				toastError('error', 'Update movie')
			},
			onSuccess: ({ data }) => {
				toastr.success('update movie', 'successfully updated movie')
				push(getAdminUrl('movies'))
			},
		}
	)
	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { isLoading, onSubmit }
}
