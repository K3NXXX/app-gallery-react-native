import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IRemovePhotoFromAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useDeletePhotoFromAlbumMutation = () => {
	const { mutate: deletePhotoFromAlbum } = useMutation({
		mutationKey: ['deletePhotoFromAlbum'],
		mutationFn: (data: IRemovePhotoFromAlbum) =>
			albumService.removePhotoFromAlbum(data),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Deleted photo from album successful',
			})
		},
	})

	return { deletePhotoFromAlbum }
}
