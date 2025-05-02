import {
	IAddPhoto,
	IAddPhotoWithFilters,
	IAddTagsToPhoto,
	IDeletePhoto,
	IRenamePhoto,
} from '../@types/photos/photos.type'
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

	async deletePhoto(photoId: IDeletePhoto) {
		const { data } = await api.post(
			`${this.BASE_URL}/photos/deletePhoto`,
			photoId
		)
		return data
	}

	async getAllPhotos() {
		const { data } = await api.get(`${this.BASE_URL}/photos/getAllPhotos`)
		return data
	}

	async renamePhoto(renamePhotoData: IRenamePhoto) {
		const { data } = await api.put(
			`${this.BASE_URL}/photos/renamePhoto`,
			renamePhotoData
		)
		return data
	}

	async addPhotoWithFilters(photoFilter: IAddPhotoWithFilters) {
		const { data } = await api.post(
			`${this.BASE_URL}/photos/addFiltersToPhoto`,
			photoFilter
		)
		return data
	}

	async addTagsToPhoto(tagsData: IAddTagsToPhoto) {
		const { data } = await api.post(
			`${this.BASE_URL}/photos/addTagsToPhoto`,
			tagsData
		)
		return data
	}
}

export const photoService = new PhotoService()
