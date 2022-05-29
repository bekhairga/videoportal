import ActorEdit from '@/components/screens/admin/actors/edit/ActorEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorsEditPage: NextPageAuth = () => {
	return (
		<div>
			<ActorEdit />
		</div>
	)
}
ActorsEditPage.isOnlyAdmin = true
export default ActorsEditPage
