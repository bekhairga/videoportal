import GenreEdit from '@/components/screens/admin/genres/edit/GenreEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenresEditPage: NextPageAuth = () => {
	return (
		<div>
			<GenreEdit />
		</div>
	)
}
GenresEditPage.isOnlyAdmin = true
export default GenresEditPage
