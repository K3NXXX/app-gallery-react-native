export interface IAddPhoto {
	url: string
	userId: number | undefined
}

export interface IPhoto {
	id: number
	userId: number
	url: string
	name: string
	createdAt: string
}

export interface IGetAllPhotos {
	userId: string
}

export interface IDeletePhoto {
	photoId: number
}

export interface IRenamePhoto {
	photoId: number
	newName: string
}