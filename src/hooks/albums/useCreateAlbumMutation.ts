import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { ICreateAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useCreateAlbumMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: createAlbum } = useMutation({
		mutationKey: ['createAlbum'],
		mutationFn: (data: ICreateAlbum) => albumService.createAlbum(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllAlbums'])
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
