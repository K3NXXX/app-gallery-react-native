import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IRemovePhotoFromAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useDeletePhotoFromAlbumMutation = (albumId: number | null) => {
	const queryClient = useQueryClient()

	const { mutate: deletePhotoFromAlbum } = useMutation({
		mutationKey: ['deletePhotoFromAlbum'],
		mutationFn: (data: IRemovePhotoFromAlbum) =>
			albumService.removePhotoFromAlbum(data),

		onSuccess: () => {
			queryClient.invalidateQueries(['getOneAlbum'])
			queryClient.invalidateQueries(['getAllAlbums'])
		},
	})

	return { deletePhotoFromAlbum }
}
