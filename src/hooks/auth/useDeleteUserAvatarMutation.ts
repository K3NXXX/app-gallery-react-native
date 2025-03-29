import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { authService } from '../../services/auth.service'
import { useState } from 'react'

export const useDeleteUserAvatarMutation = () => {
	const queryClient = useQueryClient()
	const [deleteAvatarSuccess, useDeleteAvatarSuccess] = useState(false)
	const { mutate: deleteAvatar } = useMutation({
		mutationKey: ['updateUserAvatar'],
		mutationFn: () => authService.deleteAvatar(),
		onSuccess: () => {
			useDeleteAvatarSuccess(true)
			queryClient.invalidateQueries(['getMe'])
			Toast.show({
				type: 'success',
				text1: 'Deleted avatar successful',
			})
		},
		onMutate: () => {
			useDeleteAvatarSuccess(false)
		}
	})
	return { deleteAvatar, deleteAvatarSuccess }
}
