export interface IAddPhoto {
	url: string
}

export interface IPhoto {
	id: number
	userId: number
	url: string
	name: string
	createdAt: string
	hashtags: IHashtag[]
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

export interface IAddPhotoWithFilters {
	url: string
	brightness: number
}

export interface IAddTagsToPhoto {
	photoId: number
	tags: string[]
}

export interface IDeleteTagFromPhoto {
	photoId: number
	hashtagId: number
}

export interface IHashtag {
	id: number
	name: string
}

