import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { IDeletePhoto, IPhoto } from '../../@types/photos/photos.type'
import { photoService } from '../../services/photos.service'

export const useDeletePhotoMutation = () => {
  const queryClient = useQueryClient()
  const { mutate: deletePhoto } = useMutation({
    mutationKey: ['deletePhoto'],
    mutationFn: (data: IDeletePhoto) => photoService.deletePhoto(data),
    onMutate: async (deletedPhoto) => {
      await queryClient.cancelQueries(['getAllPhotos'])
      await queryClient.cancelQueries(['getFavouritesPhoto'])

      const previousPhotos = queryClient.getQueryData<IPhoto[]>(['getAllPhotos'])
      const previousFavouritePhotos = queryClient.getQueryData<IPhoto[]>(['getFavouritesPhoto'])

      if (previousPhotos) {
        queryClient.setQueryData(
          ['getAllPhotos'],
          previousPhotos.filter(photo => photo.id !== deletedPhoto.photoId)
        )
      }

      if (previousFavouritePhotos) {
        queryClient.setQueryData(
          ['getFavouritesPhoto'],
          previousFavouritePhotos.filter(photo => photo.id !== deletedPhoto.photoId)
        )
      }

      return { previousPhotos, previousFavouritePhotos }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPhotos) {
        queryClient.setQueryData(['getAllPhotos'], context.previousPhotos)
      }
      if (context?.previousFavouritePhotos) {
        queryClient.setQueryData(['getFavouritesPhoto'], context.previousFavouritePhotos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getAllPhotos'])
      queryClient.invalidateQueries(['getFavouritesPhoto'])
    },
  })

  return { deletePhoto }
}
