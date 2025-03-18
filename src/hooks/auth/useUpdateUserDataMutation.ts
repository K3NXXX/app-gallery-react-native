import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { IEditData } from '../../@types/auth/user.types'
import { authService } from '../../services/auth.service'

export const useUpdateUserDataMutation = () => {
	const [dataEdited, setDataEdited] = useState(true)
	const queryClient = useQueryClient()
	const { mutate: updateData } = useMutation({
		mutationKey: ['updateUserData'],
		mutationFn: (data: IEditData) => authService.updateUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getMe']), setDataEdited(false)
			Toast.show({
				type: 'success',
				text1: 'Edited data successful',
			})
		},
	})
	return { updateData, dataEdited }
}
