import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAddPhotoToAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useAddPhotoToAlbumMutation = () => {
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
