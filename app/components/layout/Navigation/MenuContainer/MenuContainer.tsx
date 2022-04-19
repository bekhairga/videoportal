import { FC } from 'react'

import Menu from './Menu'
import { GenreMenu } from './genres/GenreMenu'
import { mainMenu, userMenu } from './menu.data'

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={mainMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</div>
	)
}

export default MenuContainer
