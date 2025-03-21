import { useQuery } from '@tanstack/react-query'
import { favouriteService } from '../../services/favourites.service'
import { IPhoto } from '../../@types/photos/photos.type'

export const useGetAllFavouritesPhotoQuery = () => {
	const {data: favouritePhotos} = useQuery<IPhoto[]>({
		queryKey: ['getFavouritesPhoto'],
		queryFn: () => favouriteService.getAllFavouritesPhoto()
	})

	return {favouritePhotos}
}