import { FC } from 'react'

import { getAdminHomeUrl } from '@/config/url.config'

import { useAuth } from '../../../../../../hooks/useAuth'
import { MenuItem } from '../MenuItem'

import { LogoutButton } from './LogoutButton'

export const AuthItems: FC = () => {
	const { user } = useAuth()
	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{ icon: 'MdSettings', link: '/profile', title: 'Profile' }}
					/>
					<LogoutButton />
				</>
			) : (
				<MenuItem item={{ icon: 'MdLogin', link: '/auth', title: 'Login' }} />
			)}
			{user?.isAdmin && (
				<MenuItem
					item={{
						icon: 'MdOutlineLock',
						link: getAdminHomeUrl(),
						title: 'Admin Panel',
					}}
				/>
			)}
		</>
	)
}
