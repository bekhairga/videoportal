import { FC } from 'react'
import Meta from 'utils/meta/Meta'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/components/ui/admin-table/AdminTable'
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader'
import Heading from '@/components/ui/heading/Heading'

import { useMovies } from './useMovies'

const MoviesList: FC = () => {
	const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useMovies()
	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				headerItems={['Title', 'Genres', 'Rating', 'Actions']}
				tableItems={data || []}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}
export default MoviesList
