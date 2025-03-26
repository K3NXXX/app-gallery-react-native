import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IDeletePhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useDeletePhotoMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: deletePhoto } = useMutation({
		mutationKey: ['deletePhoto'],
		mutationFn: (data: IDeletePhoto) => photoService.deletePhoto(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllPhotos'])
			queryClient.invalidateQueries(['getFavouritesPhoto'])
			Toast.show({
				type: 'success',
				text1: 'Photo deleted successful',
			})
		},
	})

	return { deletePhoto }
}
