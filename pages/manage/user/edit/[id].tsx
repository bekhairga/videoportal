import UserEdit from '@/components/screens/admin/home/users/edit/UserEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const UsersEditPage: NextPageAuth = () => {
	return (
		<div>
			<UserEdit />
		</div>
	)
}
UsersEditPage.isOnlyAdmin = true
export default UsersEditPage
