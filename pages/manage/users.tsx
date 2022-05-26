import UserList from '@/components/screens/admin/home/users/UserList'

import { NextPageAuth } from '@/shared/types/auth.types'

const UserListPage: NextPageAuth = () => {
	return (
		<div>
			<UserList />
		</div>
	)
}
UserListPage.isOnlyAdmin = true
export default UserListPage
