export interface ICreateAlbum {
	name: string
	description?: string
	image?: string
}

export interface IAlbum {
	createdAt: string
	name: string
	description: string
	imageUrl: string
	id: number
}