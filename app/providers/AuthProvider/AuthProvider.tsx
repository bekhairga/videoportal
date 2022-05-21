import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { useActions } from '../../../hooks/useActions'
import { useAuth } from '../../../hooks/useAuth'

const DynamicCheckRoles = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children,
}) => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()
	const { pathname } = useRouter()
	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (user && !refreshToken) logout()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRoles Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}{' '}
		</DynamicCheckRoles>
	)
}
export default AuthProvider
