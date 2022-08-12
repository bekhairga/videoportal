import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import { FC, useEffect } from 'react'

import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { convertStringToQueryKey } from '@/shared/queryKey.type'

import { AdminService } from '@/services/admin.service'

import styles from '../../Admin.module.scss'

const CountUsers: FC = () => {
	const { isLoading, data: response } = useQuery(
		convertStringToQueryKey('Count users'),
		() => AdminService.getUsersCount()
	)
	return (
		<div className={cn(styles.block, styles.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={styles.number}>{response?.data}</div>
				)}
				<div className={styles.description}>users</div>
			</div>
		</div>
	)
}
export default CountUsers
