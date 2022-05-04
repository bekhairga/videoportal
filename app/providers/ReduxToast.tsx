import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToast: FC = () => {
	return (
		<ReduxToastr
			newestOnTop={false}
			preventDuplicates={true}
			progressBar={true}
			closeOnToastrClick={true}
			timeOut={4000}
			transitionIn={'fadeIn'}
			transitionOut={'fadeOut'}
		/>
	)
}

export default ReduxToast
