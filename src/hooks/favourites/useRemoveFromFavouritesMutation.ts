import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAddFavourite } from '../../@types/favourites/favourites.types'
import { favouriteService } from '../../services/favourites.service'

export const useRemoveFromFavourites = () => {
	const queryClient = useQueryClient()
	const { mutate: removeFromFavourites } = useMutation({
		mutationKey: ['removeFavourite'],
		mutationFn: (data: IAddFavourite) =>
			favouriteService.removeFromFavourite(data),

		onSuccess: () => {
			queryClient.invalidateQueries(['getFavouritesPhoto'])
		},
	})

	return { removeFromFavourites }
}
