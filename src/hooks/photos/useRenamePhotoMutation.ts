import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { IRenamePhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useRenamePhotoMutation = () => {
	const queryClient = useQueryClient()
	const [renamePhotoError, setRenamePhotoError] = useState(false)
	const [renamingSuccess, setRenamingSuccess] = useState(false)
	const { mutate: renamePhoto } = useMutation({
		mutationKey: ['renamePhoto'],
		mutationFn: (data: IRenamePhoto) => photoService.renamePhoto(data),
		onSuccess: () => {
			setRenamingSuccess(true)
			queryClient.invalidateQueries(['getAllPhotos'])
			queryClient.invalidateQueries(['getFavouritesPhoto'])
		},
		onError(error: any) {
			if (error?.response?.status === 400) setRenamePhotoError(true)
		},
	})

	return { renamePhoto, renamingSuccess, renamePhotoError }
}
