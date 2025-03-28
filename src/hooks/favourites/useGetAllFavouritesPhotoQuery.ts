import { useQuery } from '@tanstack/react-query'
import { favouriteService } from '../../services/favourites.service'
import { IPhoto } from '../../@types/photos/photos.type'

export const useGetAllFavouritesPhotoQuery = () => {
	const {data: favouritePhotos, error} = useQuery<IPhoto[], any>({
		queryKey: ['getFavouritesPhoto'],
		queryFn: () => favouriteService.getAllFavouritesPhoto(),
		
	})

	return {favouritePhotos, error}
}