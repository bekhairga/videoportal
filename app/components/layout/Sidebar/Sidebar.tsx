import { FC } from 'react'

import Search from './Search/Search'
import styles from './Sidebar.module.scss'

export const Sidebar: FC = () => {
	return (
		<div className={styles.sidebar}>
			<Search />
		</div>
	)
}
