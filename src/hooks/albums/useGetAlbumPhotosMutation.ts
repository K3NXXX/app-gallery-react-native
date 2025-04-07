import { useMutation } from '@tanstack/react-query'
import { IGetAlbumPhotos } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'
import { useState } from 'react'
import { IPhoto } from '../../@types/photos/photos.type'

export const useGetAlbumPhotosMutation = () => {
	const [albumPhotos, setAlbumPhotos] = useState<IPhoto[]>([])
	const { mutate: getAlbumPhotos } = useMutation({
		mutationKey: ['getAlbumPhotos'],
		mutationFn: (data: IGetAlbumPhotos) => albumService.getAlbumPhotos(data),
		onSuccess: (data) => {
			setAlbumPhotos(data)
		}
	})

	return { getAlbumPhotos, albumPhotos }
}
