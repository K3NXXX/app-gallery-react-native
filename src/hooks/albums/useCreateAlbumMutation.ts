import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { ICreateAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useCreateAlbumMutation = () => {
	const { mutate: createAlbum } = useMutation({
		mutationKey: ['createAlbum'],
		mutationFn: (data: ICreateAlbum) => albumService.createAlbum(data),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Album created successful',
			})
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Error during creating album',
			})
		},
	})

	return { createAlbum }
}
