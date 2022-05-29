import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { getKeys } from 'utils/object/getKeys'
import { toastError } from 'utils/toastError'

import { UserService } from '@/services/user.service'

import { getAdminUrl } from '@/config/url.config'

import { IUserEditInput } from './user-edit.interface'

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
	const { push, query } = useRouter()
	const userId = String(query.id)
	const { isLoading } = useQuery(
		['user', userId],
		() => UserService.getById(userId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError: (error) => {
				toastError('error', 'Get user')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		'update user',
		(data: IUserEditInput) => UserService.updateUser(userId, data),
		{
			onError: (error) => {
				toastError('error', 'Update user')
			},
			onSuccess: ({ data }) => {
				toastr.success('update user', 'successfully updated user')
				push(getAdminUrl('users'))
			},
		}
	)
	const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
		await mutateAsync(data)
	}
	return { isLoading, onSubmit }
}
