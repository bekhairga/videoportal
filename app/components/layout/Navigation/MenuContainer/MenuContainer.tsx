import { FC } from 'react'

import Menu from './Menu'
import { mainMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={mainMenu} />
			{/* genres menu */}
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
