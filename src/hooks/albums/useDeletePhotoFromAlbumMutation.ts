import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import {
	IGetOneAlbum,
	IRemovePhotoFromAlbum,
} from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useDeletePhotoFromAlbumMutation = (
	albumId: number,
	getOneAlbum: (data: IGetOneAlbum) => void
) => {
	const queryClient = useQueryClient()
	
	const { mutate: deletePhotoFromAlbum } = useMutation({
		mutationKey: ['deletePhotoFromAlbum'],
		mutationFn: (data: IRemovePhotoFromAlbum) =>
			albumService.removePhotoFromAlbum(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getOneAlbum'])
			getOneAlbum({ albumId: albumId })

			Toast.show({
				type: 'success',
				text1: 'Deleted photo from album successful',
			})
		},
	})

	return { deletePhotoFromAlbum }
}
