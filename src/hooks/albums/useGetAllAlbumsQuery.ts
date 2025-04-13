import { useQuery } from '@tanstack/react-query'
import { albumService } from '../../services/albums.service'
import { IAlbum } from '../../@types/albums/albums.types'

export const useGetAllAlbumsQuery =() => {
	const {data: allAlbums, isLoading, isFetching, refetch } = useQuery<IAlbum[]>({
		queryKey: ['getAllAlbums'],
		
		queryFn: () => albumService.getAllAlbums(),
		
	}) 

	return {allAlbums, isLoading, isFetching, refetch}
}