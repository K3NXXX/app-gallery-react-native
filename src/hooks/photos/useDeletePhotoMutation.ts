import { useMutation } from '@tanstack/react-query'
import { photoService } from '../../services/photos.service'
import { IDeletePhoto } from '../../@types/photos/photos.type'

export const useDeletePhotoMutation = () => {
	const {mutate:deletePhoto} = useMutation({
		mutationKey: ['deletePhoto'],
		mutationFn: (data: IDeletePhoto) => photoService.deletePhoto(data)
	})

	return {deletePhoto}
}