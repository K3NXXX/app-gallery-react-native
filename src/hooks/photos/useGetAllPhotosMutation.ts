import { useQuery } from '@tanstack/react-query'
import { photoService } from '../../services/photos.service'
import { IPhoto } from '../../@types/photos/photos.type'

export const useGetAllPhotos = () => {
	const {data: allPhotos, isLoading} = useQuery<IPhoto[]>({queryKey: ['getAllPhotos'],
		queryFn: () => photoService.getAllPhotos() 
	})

	return {allPhotos, isLoading}
}