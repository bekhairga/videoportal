import { FC } from 'react'
import { toastr } from 'react-redux-toastr'
import Meta from 'utils/meta/Meta'

import Heading from '@/components/ui/heading/Heading'
import Slider from '@/components/ui/slider/Slider'

import { IHome } from './home.interface'

const Home: FC<IHome> = ({ slides }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch MovieApp movies and TV shows online or stream right to your browser"
		>
			<Heading
				title="Watch movies online"
				className="text-grey-300 mb-8 text-xl"
			/>
			{slides.length && <Slider slides={slides} />}
		</Meta>
	)
}

export default Home
