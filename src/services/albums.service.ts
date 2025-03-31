import { ICreateAlbum } from '../@types/albums/albums.types'
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
}

export const albumService = new AlbumService()
