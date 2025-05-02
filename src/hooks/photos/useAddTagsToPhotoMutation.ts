import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IAddTagsToPhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useAddTagsToPhotoMutation = () => {
	const queryClient = useQueryClient()
	const { mutate: addTagsToPhoto } = useMutation({
		mutationKey: ['addTagsToPhoto'],
		mutationFn: (data: IAddTagsToPhoto) => photoService.addTagsToPhoto(data),
		onSuccess: () => {
			queryClient.invalidateQueries(['getAllPhotos'])
		},
	})
	return { addTagsToPhoto }
}
