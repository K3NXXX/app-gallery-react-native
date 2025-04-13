import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import {
	IAddPhotoToAlbum,
	IGetOneAlbum,
} from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useAddPhotoToAlbumMutation = (
	setAlbumUpdated: (value: boolean) => void
) => {
	const queryClient = useQueryClient()
	const { mutate: addPhotoToAlbum } = useMutation({
		mutationKey: ['addPhotoToAlbum'],
		mutationFn: (data: IAddPhotoToAlbum) => albumService.addPhotoToAlbum(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getOneAlbum'])
			queryClient.invalidateQueries(['getAllAlbums'])
		},
	})
	return { addPhotoToAlbum }
}
