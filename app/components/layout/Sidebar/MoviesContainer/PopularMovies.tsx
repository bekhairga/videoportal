import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { convertStringToQueryKey } from '@/shared/queryKey.type'
import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import MovieList from './MovieList'
import { IMovieList } from './movie-list.interface'

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies } = useQuery(
		convertStringToQueryKey('Popular movies in sidebar'),
		() => MovieService.getAll('')
	)
	return isLoading ? (
		<div className="mt-11">
			<SkeletonLoader count={3} className="h-28 mb-4" />
		</div>
	) : (
		<MovieList
			link="/trending"
			movies={(Array.isArray(popularMovies) && popularMovies) || []}
			title="Popular movies"
		/>
	)
}

export default PopularMovies
