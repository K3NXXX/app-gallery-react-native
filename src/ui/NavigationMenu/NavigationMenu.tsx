import React, { useState } from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useClickOutside } from 'react-native-click-outside'
import CameraIcon from '../../../assets/images/navigation-menu/camera.svg'
import GalleryIcon from '../../../assets/images/navigation-menu/gallery-icon.svg'
import { useGetMe } from '../../hooks/auth/useGetMe'
import { useAddPhotoMutation } from '../../hooks/photos/useAddPhotoMutation'
import { menuList } from '../../lists/menu.list'
import { handleUploadImage } from '../../utils/handleUploadImage'
import { styles } from './NavigationMenu.styles'

const NavigationMenu: React.FC = () => {
	const [addPhoto, setAddPhoto] = useState(false)
	const { navigate } = useNavigation()
	const ref = useClickOutside<View>(() => setAddPhoto(false))
	const { createPhoto } = useAddPhotoMutation()

	return (
		<>
			{addPhoto && (
				<View style={styles.modal}>
					<View ref={ref} style={styles.ways}>
						<Text style={styles.title}>Add photo</Text>
						<View style={styles.wayWrapper}>
							<Pressable
								onPress={() =>
									handleUploadImage(undefined, createPhoto)
								}
							>
								<View style={[styles.container, styles.firstContainer]}>
									<CameraIcon width={40} height={40} />
									<Text style={styles.way}>Camera</Text>
								</View>
							</Pressable>
							<Pressable
								onPress={() =>
									handleUploadImage('gallery', createPhoto)
								}
							>
								<View style={styles.container}>
									<GalleryIcon
										style={styles.iconGallery}
										width={30}
										height={30}
									/>
									<Text style={styles.way}>Gallery</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			<View style={styles.root}>
				<View style={styles.wrapper}>
					{menuList.map(item => (
						<TouchableOpacity
							//@ts-ignore
							onPress={() => navigate(item.link)}
							style={styles.item}
							key={item.id}
						>
							{item.id === 3 ? (
								<View style={styles.addPhotoWrapper}>
									<TouchableOpacity onPress={() => setAddPhoto(!addPhoto)}>
										<item.icon style={styles.createIcon} fill='#ee9938' />
									</TouchableOpacity>
								</View>
							) : (
								<item.icon width={25} height={25} style={styles.icon} />
							)}
							<Text style={styles.label}>{item.label}</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</>
	)
}
export default NavigationMenu
