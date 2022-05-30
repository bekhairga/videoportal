import { GetStaticProps, NextPage } from 'next'
import { getGenresList } from 'utils/movie/getGenresListEach'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { MovieService } from '@/services/movie.service'

import { getMoviesUrl } from '@/config/api.config'
import { getMovieUrl } from '@/config/url.config'

const HomePage: NextPage<IHome> = ({ slides }) => {
	return <Home slides={slides} />
}

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll('')
		const slides: ISlide[] = movies.slice(0, 3).map((slide) => ({
			_id: slide._id,
			link: getMovieUrl(slide.slug),
			bigPoster: slide.bigPoster,
			subTitle: getGenresList(slide.genres),
			title: slide.title,
		}))
		return {
			props: {
				slides,
			} as IHome,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
			},
		}
	}
}

export default HomePage
