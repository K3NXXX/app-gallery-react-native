export interface IAddPhoto {
	url: string
	userId: number | undefined
}

export interface IPhoto {
	id: number
	userId: number
	url: string
	name: string
}

export interface IGetAllPhotos {
	userId: string
}