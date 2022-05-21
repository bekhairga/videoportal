import { FC } from 'react'

const NotAuthFavorites: FC = () => {
	return (
		<div className="bg-grey-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80 mt-11">
			For viewing favorites please authorize
		</div>
	)
}

export default NotAuthFavorites
