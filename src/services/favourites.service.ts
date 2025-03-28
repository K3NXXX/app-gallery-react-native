import { IAddFavourite, IRemoveFavourite } from '../@types/favourites/favourites.types'
import api from '../axios/interceptors'

class FavouriteService {
	private BASE_URL = process.env.EXPO_PUBLIC_API_URL

	async addToFavourite(photoId: IAddFavourite) {
		const { data } = await api.post(
			`${this.BASE_URL}/favourites/addFavourite`,
			photoId
		)
		return data
	}

	async removeFromFavourite(photoId: IRemoveFavourite) {
		const { data } = await api.post(
			`${this.BASE_URL}/favourites/removeFromFavourites`,
			photoId
		)
		return data
	}

	async getAllFavouritesPhoto() {
		const { data } = await api.get(`${this.BASE_URL}/favourites/getAllFavourite`)
		return data
	}
}

export const favouriteService = new FavouriteService()
