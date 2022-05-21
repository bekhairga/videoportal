import { useRouter } from 'next/router'
import { FC } from 'react'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { useAuth } from '../../../hooks/useAuth'

const CheckRole: FC<TypeComponentAuthFields> = ({
	Component: { isOnlyAdmin, isOnlyUser },
	children,
}) => {
	const { user } = useAuth()
	const router = useRouter()
	const Children = () => <>{children}</>

	if (user?.isAdmin) return <Children />
	if (isOnlyAdmin) {
		router.pathname !== '/404' && router.replace('/404')
		return null
	}
	const isUser = user && !user.isAdmin
	if (isUser && isOnlyUser) return <Children />
	else {
		router.pathname !== '/auth' && router.replace('/auth')
		return null
	}
}
export default CheckRole
