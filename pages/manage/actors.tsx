import ActorsList from '@/components/screens/admin/actors/ActorsList'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorsListPage: NextPageAuth = () => {
	return (
		<div>
			<ActorsList />
		</div>
	)
}
ActorsListPage.isOnlyAdmin = true
export default ActorsListPage
