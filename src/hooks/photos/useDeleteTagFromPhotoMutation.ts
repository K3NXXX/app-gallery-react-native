import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IDeleteTagFromPhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useDeleteTagFromPhotoMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: deleteTagFromPhoto } = useMutation({
		mutationKey: ['deleteTagFromPhoto'],
		mutationFn: (data: IDeleteTagFromPhoto) =>
			photoService.deleteTagFromPhoto(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllPhotos'])
		},
	})
	return { deleteTagFromPhoto }
}
