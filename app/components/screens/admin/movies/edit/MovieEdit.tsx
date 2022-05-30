import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Meta from 'utils/meta/Meta'
import generateSlug from 'utils/string/generateSlug'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'
import SlugField from '@/components/ui/form-elements/slug-field/SlugField'
import Heading from '@/components/ui/heading/Heading'

import formStyles from '@/ui/form-elements/admin-form.module.scss'

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(
	() => import('../../../../ui/form-elements/select/Select'),
	{ ssr: false }
)
const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useMovieEdit(setValue)
	const { isLoading: areGenresLoading, data: genresList } = useAdminGenres()
	const { isLoading: areActorsLoading, data: actorsList } = useAdminActors()
	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', { required: 'Title is required' })}
								placeholder={'Name'}
								error={errors.title}
								style={{ width: '31%' }}
							/>

							<SlugField
								generate={() => {
									setValue('slug', generateSlug(getValues('title')))
								}}
								register={register}
								error={errors.slug}
							/>
							<Field
								{...register('parameters.country', {
									required: 'Country is required',
								})}
								placeholder={'Country'}
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required',
								})}
								placeholder={'Duration'}
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required',
								})}
								placeholder={'Year'}
								error={errors.parameters?.year}
								style={{ width: '31%' }}
							/>
							<Controller
								name="genres"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={genresList || []}
										isLoading={areGenresLoading}
										isMulti={true}
										placeholder="Genres"
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one genre',
								}}
							/>
							<Controller
								name="actors"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										field={field}
										options={actorsList || []}
										isLoading={areActorsLoading}
										isMulti={true}
										placeholder="Actors"
										error={error}
									/>
								)}
								rules={{
									required: 'Please select at least one genre',
								}}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required',
								})}
								placeholder={'Duration'}
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Controller
								name="poster"
								control={control}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="poster"
										error={error}
										folder="movies"
										value={value}
										onChange={onChange}
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>
							<Controller
								name="bigPoster"
								control={control}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Big Poster"
										error={error}
										folder="movies"
										value={value}
										onChange={onChange}
									/>
								)}
								rules={{
									required: 'Big Poster is required!',
								}}
							/>
							<Controller
								name="videoUrl"
								control={control}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Video"
										error={error}
										folder="movies"
										value={value}
										onChange={onChange}
										style={{ marginTop: '-25px' }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}
export default MovieEdit
