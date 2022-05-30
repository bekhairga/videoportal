import { useQuery } from 'react-query'
import { toastError } from 'utils/toastError'

import { IOptions } from '@/components/ui/form-elements/select/select.interface'

import { GenreService } from '@/services/genre.service'

export const useAdminGenres = () => {
	const queryData = useQuery('List of genres', () => GenreService.getAll(''), {
		select: ({ data }) =>
			data.map(
				(genre): IOptions => ({
					label: genre.name,
					value: genre._id,
				})
			),
		onError: (error) => {
			toastError(error, 'genre list')
		},
	})
	return queryData
}
