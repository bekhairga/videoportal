import { FC } from 'react'

import styles from './Navigation.module.scss'

const Navigation: FC = () => {
	return <div className={styles.navigation}>
		<Logo />
	</div>
}

export default Navigation
