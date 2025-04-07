import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IDeleteAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useDeleteAlbumMutation = () => {
	const { mutate: deleteAlbum } = useMutation({
		mutationKey: ['deleteAlbum'],
		mutationFn: (data: IDeleteAlbum) => albumService.deleteAlbum(data),
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Album deleted successfully',
			})
		},
	})

	return { deleteAlbum }
}
