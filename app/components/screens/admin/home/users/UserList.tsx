import { FC } from 'react'
import Meta from 'utils/meta/Meta'

import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import AdminTable from '@/components/ui/admin-table/AdminTable'
import AdminHeader from '@/components/ui/admin-table/admin-header/AdminHeader'
import Heading from '@/components/ui/heading/Heading'

import { useUsers } from './useUsers'

const UserList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchTerm,
		data,
		createAsync,
		deleteAsync,
	} = useUsers()
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader
				handleSearch={handleSearch}
				searchTerm={searchTerm}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Email', 'Date register', 'Actions']}
				tableItems={data || []}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}
export default UserList
