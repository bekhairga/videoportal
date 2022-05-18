import { FC, MouseEvent } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { useActions } from '../../../../../../hooks/useActions'

export const LogoutButton: FC = () => {
	const { logout } = useActions()
	const handleLogout = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		logout()
	}
	return (
		<li>
			<a onClick={handleLogout}>
				<MaterialIcon name="MdLogout" />
				<span>Logout</span>
			</a>
		</li>
	)
}
