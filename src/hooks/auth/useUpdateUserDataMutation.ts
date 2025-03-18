import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IEditData } from '../../@types/auth/user.types'
import { authService } from '../../services/auth.service'
import { useState } from 'react'

export const useUpdateUserDataMutation = () => {
	const [dataEdited, setDataEdited] = useState(true)
	const queryClient = useQueryClient()
	const { mutate: updateData } = useMutation({
		mutationKey: ['updateUserData'],
		mutationFn: (data: IEditData) => authService.updateUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getMe']),
			setDataEdited(false)
		},
	})
	return { updateData, dataEdited }
}
