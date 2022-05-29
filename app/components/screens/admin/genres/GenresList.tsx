import { FC } from 'react'
import Meta from 'utils/meta/Meta'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/components/ui/admin-table/AdminTable'
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader'
import Heading from '@/components/ui/heading/Heading'

import { useGenres } from './useGenres'

const GenresList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchTerm,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()
	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Name', 'Slug', 'Actions']}
				tableItems={data || []}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}
export default GenresList
