import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAddFavourite } from '../../@types/favourites/favourites.types'
import { favouriteService } from '../../services/favourites.service'
import { IPhoto } from '../../@types/photos/photos.type'

export const useRemoveFromFavourites = () => {
	const queryClient = useQueryClient()
	const { mutate: removeFromFavourites } = useMutation({
		mutationKey: ['removeFavourite'],
		mutationFn: (data: IAddFavourite) =>
			favouriteService.removeFromFavourite(data),

		onSuccess: () => {
			queryClient.invalidateQueries(['getFavouritesPhoto'])
				const favouritePhotos = queryClient.getQueryData<IPhoto[]>(['getFavouritesPhoto'])
				if (favouritePhotos && favouritePhotos.length === 1) {
					queryClient.removeQueries(['getFavouritesPhoto'])
				}
		},
	})

	return { removeFromFavourites }
}
