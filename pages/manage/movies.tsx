import MoviesList from '@/components/screens/admin/movies/MoviesList'

import { NextPageAuth } from '@/shared/types/auth.types'

const MoviesListPage: NextPageAuth = () => {
	return (
		<div>
			<MoviesList />
		</div>
	)
}
MoviesListPage.isOnlyAdmin = true
export default MoviesListPage
