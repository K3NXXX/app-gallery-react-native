import { useQuery } from '@tanstack/react-query'
import { albumService } from '../../services/albums.service'
import { IAlbum } from '../../@types/albums/albums.types'

export const useGetAllAlbumsQuery =() => {
	const {data: allAlbums} = useQuery<IAlbum[]>({
		queryKey: ['getAllAlbums'],
		queryFn: () => albumService.getAllAlbums()
	}) 

	return {allAlbums}
}