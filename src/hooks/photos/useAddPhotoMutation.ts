import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IAddPhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useAddPhotoMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: createPhoto } = useMutation({
		mutationKey: ['addPhoto'],
		mutationFn: (data: IAddPhoto) => photoService.addPhoto(data),
		onSuccess: async data => {
			queryClient.invalidateQueries(['getAllPhotos'])
			Toast.show({
				type: 'success',
				text1: 'Photo added successful',
			})
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'An error occurred during adding photo',
			})
		},
	})

	return { createPhoto }
}
