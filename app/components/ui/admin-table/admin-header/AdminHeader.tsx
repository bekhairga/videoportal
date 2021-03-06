import { ChangeEvent, FC } from 'react'

import SearchField from '../../search-field/SearchField'

import styles from './AdminHeader.module.scss'
import AdminCreateButton from './admin-create-button/AdminCreateButton'

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}
const AdminHeader: FC<IAdminHeader> = ({
	handleSearch,
	searchTerm,
	onClick,
}) => {
	return (
		<div className={styles.header}>
			<SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	)
}
export default AdminHeader
