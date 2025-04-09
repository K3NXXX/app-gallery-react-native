import { useNavigation } from '@react-navigation/native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IAlbum, IDeleteAlbum } from '../../@types/albums/albums.types'
import { SCREENS } from '../../constants/screens.constants'
import { albumService } from '../../services/albums.service'

export const useDeleteAlbumMutation = () => {
	const queryClient = useQueryClient()
	const { reset } = useNavigation()
	const { mutate: deleteAlbum } = useMutation({
		mutationKey: ['deleteAlbum'],
		mutationFn: (data: IDeleteAlbum) => albumService.deleteAlbum(data),
		onSuccess: async () => {
			queryClient.invalidateQueries(['getAllAlbums'])
			const allAlbums = queryClient.getQueryData<IAlbum[]>([
				'getAllAlbums',
			])
			if (allAlbums && allAlbums.length === 1) {
				queryClient.removeQueries(['getAllAlbums'])
			}
			reset({
				index: 0,
				//@ts-ignore
				routes: [{ name: SCREENS.ALBUMS }],
			})
			Toast.show({
				type: 'success',
				text1: 'Album deleted successfully',
			})
		},
	})

	return { deleteAlbum }
}
