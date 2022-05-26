import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'
import Meta from 'utils/meta/Meta'
import generateSlug from 'utils/string/generateSlug'

import SkeletonLoader from '@/components/ui/SkeletonLoader'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'
import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import SlugField from '@/components/ui/form-elements/slug-field/SlugField'
import Heading from '@/components/ui/heading/Heading'

import formStyles from '@/ui/form-elements/admin-form.module.scss'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const DynamicTextEditor = dynamic(() => import('@/components/ui/TextEditor'), {
	ssr: false,
})
const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit Genre">
			<AdminNavigation />
			<Heading title="Edit Genre" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<div className={formStyles.fields}>
						<Field
							{...register('name', { required: 'Name is required' })}
							placeholder={'Name'}
							error={errors.name}
							style={{ width: '31%' }}
						/>
						<div style={{ width: '31%' }}>
							<SlugField
								generate={() => {
									setValue('slug', generateSlug(getValues('name')))
								}}
								register={register}
								error={errors.slug}
							/>
						</div>
						<Field
							{...register('icon', { required: 'icon is required' })}
							placeholder={'icon'}
							error={errors.icon}
							style={{ width: '31%' }}
						/>
					</div>
				)}
				<Controller
					name="description"
					control={control}
					// defaultValue={}
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<DynamicTextEditor
							onChange={onChange}
							value={value}
							error={error}
							placeholder="Description"
						/>
					)}
					rules={{
						validate: {
							required: (v) =>
								(v && stripHtml(v).result.length > 0) || 'Description required',
						},
					}}
				/>

				<Button>Update</Button>
			</form>
		</Meta>
	)
}
export default GenreEdit
