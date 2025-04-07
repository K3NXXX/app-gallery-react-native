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
	isCover: boolean
}

export interface IDeleteAlbum {
	albumId: number
}

export interface IEditAlbum {
	name: string
	description: string
	imageUrl: string
}