import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IDeletePhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'
import { IAddFavourite } from '../../@types/favourites/favourites.types'
import { favouriteService } from '../../services/favourites.service'

export const useAddFavouriteMutation = () => {
	const { mutate: addToFavourite } = useMutation({
		mutationKey: ['addFavourite'],
		mutationFn: (data: IAddFavourite) => favouriteService.addToFavourite(data),
		onError: () => {
			
		}
		
	})

	return { addToFavourite }
}
