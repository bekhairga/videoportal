import { useQuery } from '@tanstack/react-query'

import { convertStringToQueryKey } from '@/shared/queryKey.type'
import { IGenre } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/config/url.config'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery(
		convertStringToQueryKey('popular genre menu'),
		() => GenreService.getAll(''),
		{
			select: ({ data }) =>
				data
					.filter((genre) => genre.icon)
					.map(
						(genre: IGenre) =>
							({
								icon: genre.icon,
								link: getGenreUrl(genre.slug),
								title: genre.name,
							} as IMenuItem)
					)
					.splice(0, 4),
		}
	)
	return queryData
}
