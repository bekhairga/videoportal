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

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})
	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit Actor">
			<AdminNavigation />
			<Heading title="Edit Actor" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', { required: 'Name is required' })}
								placeholder={'Name'}
								error={errors.name}
								style={{ width: '31%' }}
							/>

							<SlugField
								generate={() => {
									setValue('slug', generateSlug(getValues('name')))
								}}
								register={register}
								error={errors.slug}
							/>
							<Controller
								name="photo"
								control={control}
								// defaultValue={}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Photo"
										error={error}
										folder="actors"
										value={value}
										onChange={onChange}
									/>
								)}
								rules={{
									required: 'Photo is required!',
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
export default ActorEdit
