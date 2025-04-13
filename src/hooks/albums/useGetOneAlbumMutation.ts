import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { IAlbum, IGetOneAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'

export const useGetOneAlbumMutation = () => {
	const [albumData, setAlbumData] = useState<IAlbum>()
	const { mutate: getOneAlbum } = useMutation({
		mutationKey: ['getOneAlbum'],
		mutationFn: (data: IGetOneAlbum) => albumService.getOneAlbum(data),
		onSuccess: ({album}) => {
			console.log("album got")
			setAlbumData(album)
		},
	})

	return { getOneAlbum, albumData }
}
