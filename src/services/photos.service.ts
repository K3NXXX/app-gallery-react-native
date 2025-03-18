import { IAddPhoto } from '../@types/photos/photos.type'
import api from '../axios/interceptors'

class PhotoService {
	private BASE_URL = process.env.EXPO_PUBLIC_API_URL

	async addPhoto(photoData: IAddPhoto) {
		const { data } = await api.post(
			`${this.BASE_URL}/photos/addPhoto`,
			photoData
		)
		return data
	}

	async getAllPhotos() {
		const { data } = await api.get(`${this.BASE_URL}/photos/getAllPhotos`)
		return data
	}
}

export const photoService = new PhotoService()
