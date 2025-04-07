import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IAddPhotoToAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useAddPhotoToAlbumMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: addPhotoToAlbum } = useMutation({
		mutationKey: ['addPhotoToAlbum'],
		mutationFn: (data: IAddPhotoToAlbum) => albumService.addPhotoToAlbum(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAlbumPhotos'])
			Toast.show({
				type: 'success',
				text1: 'Photo added to album successful',
			})
		},
	})
	return { addPhotoToAlbum }
}
