import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { IAlbum, IGetOneAlbum } from '../../@types/albums/albums.types'
import { albumService } from '../../services/albums.service'
import { useImageStore } from '../../zustand/useStore'


export const useGetOneAlbumMutation = () => {
	const albumId = useImageStore((state) => state.albumId)

	const { data, isLoading, isFetching, refetch } = useQuery<{ album: IAlbum }>({
		queryKey: ['getOneAlbum', albumId],
		queryFn: () => albumService.getOneAlbum({ albumId }),
		enabled: !!albumId,
	})

	return { data, isLoading, isFetching, refetch }
}
