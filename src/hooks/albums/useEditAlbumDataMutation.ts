import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IEditAlbum, IGetOneAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useEditAlbumDataMutation = (
	
) => {
	const queryClient = useQueryClient()
	const { mutate: updateAlbum } = useMutation({
		mutationKey: ['updateAlbum'],
		mutationFn: (data: IEditAlbum) => albumService.updateAlbum(data),
		onSuccess: data => {
			queryClient.invalidateQueries(['getOneAlbum'])

			Toast.show({
				type: 'success',
				text1: 'Album edited successful',
			})
		},
	})

	return { updateAlbum }
}
