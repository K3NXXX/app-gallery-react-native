import { IPhoto } from '../photos/photos.type'

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
	photos: IPhoto[]
}

export interface IDeleteAlbum {
	albumId: number
}

export interface IGetAlbumPhotos {
	albumId: number
}

export interface IEditAlbum {
	name: string
	description: string
	imageUrl: string
}

export interface IAddPhotoToAlbum {
	albumId?: number;          
	albumIds?: number[];       
	photoIds: number[];
	isCover?: boolean;
  }

export interface IRemovePhotoFromAlbum {
	albumId: number
	photoIds: number[]
}

export interface IGetOneAlbum {
	albumId: number
}