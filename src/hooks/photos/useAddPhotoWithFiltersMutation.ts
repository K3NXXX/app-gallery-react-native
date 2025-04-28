import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAddPhotoWithFilters } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useAddPhotoWithFiltersMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: addPhotoWithFilter } = useMutation({
		mutationKey: ['addPhotoWithFilter'],
		mutationFn: (data: IAddPhotoWithFilters) =>
			photoService.addPhotoWithFilters(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllPhotos'])
		},
	})
	return { addPhotoWithFilter }
}
