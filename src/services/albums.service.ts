import {
	IAddPhotoToAlbum,
	ICreateAlbum,
	IDeleteAlbum,
	IEditAlbum,
	IGetAlbumPhotos,
	IGetOneAlbum,
	IRemovePhotoFromAlbum,
} from '../@types/albums/albums.types'
import api from '../axios/interceptors'

class AlbumService {
	private BASE_URL = process.env.EXPO_PUBLIC_API_URL

	async createAlbum(albumData: ICreateAlbum) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/createAlbum`,
			albumData
		)
		return data
	}

	async getAllAlbums() {
		const { data } = await api.get(`${this.BASE_URL}/albums/getAllAlbums`)
		return data
	}

	async deleteAlbum(albumId: IDeleteAlbum) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/deleteAlbum`,
			albumId
		)
		return data
	}

	async updateAlbum(editedAlbumData: IEditAlbum) {
		const { data } = await api.put(
			`${this.BASE_URL}/albums/updateAlbum`,
			editedAlbumData
		)
		return data
	}

	async addPhotoToAlbum(albumData: IAddPhotoToAlbum) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/addPhotoToAlbum`,
			albumData
		)
		return data
	}

	async getAlbumPhotos(albumData: IGetAlbumPhotos) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/getAlbumPhotos`,
			albumData
		)
		return data
	}

	async removePhotoFromAlbum(albumData: IRemovePhotoFromAlbum) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/deletePhotoFromAlbum`,
			albumData
		)
		return data
	}

	async getOneAlbum(albumData: IGetOneAlbum) {
		const { data } = await api.post(
			`${this.BASE_URL}/albums/getOneAlbum`,
			albumData
		)
		return data
	}
}

export const albumService = new AlbumService()
