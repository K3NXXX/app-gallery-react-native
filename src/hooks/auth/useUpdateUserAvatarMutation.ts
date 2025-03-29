import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { IEditAvatar, IEditData } from '../../@types/auth/user.types'
import { authService } from '../../services/auth.service'

export const useUpdateUserAvatarMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: updateAvatar } = useMutation({
		mutationKey: ['updateUserAvatar'],
		mutationFn: (data: IEditAvatar) => authService.updateAvatar(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getMe'])
			Toast.show({
				type: 'success',
				text1: 'Uploaded avatar successful',
			})
		},
	})
	return { updateAvatar, }
}
