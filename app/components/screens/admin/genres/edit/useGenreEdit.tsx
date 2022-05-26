import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { getKeys } from 'utils/object/getKeys'
import { toastError } from 'utils/toastError'

import { GenreService } from '@/services/genre.service'

import { getAdminUrl } from '@/config/url.config'

import { IGenreEditInput } from './genre-edit.interface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push, query } = useRouter()
	const genreId = String(query.id)
	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError('error', 'Get Genre')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.updateGenre(genreId, data),
		{
			onError: (error) => {
				toastError('error', 'Update Genre')
			},
			onSuccess: ({ data }) => {
				toastr.success('update genre', 'successfully updated genre')
				push(getAdminUrl('genres'))
			},
		}
	)
	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { isLoading, onSubmit }
}
