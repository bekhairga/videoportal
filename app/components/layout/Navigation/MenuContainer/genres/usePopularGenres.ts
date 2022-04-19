import { useQuery } from 'react-query'

import { IGenre } from '@/shared/types/movie.types'

import { GenreService } from '@/services/genre.service'

import { getGenreUrl } from '@/config/url.config'

import { IMenuItem } from '../menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery(
		'popular genre menu',
		() => GenreService.getPopularGenres(),
		{
			select: ({ data }) =>
				data
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
