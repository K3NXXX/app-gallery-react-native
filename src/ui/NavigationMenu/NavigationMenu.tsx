import React, { useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { menuList } from '../../lists/menu.list'
import { styles } from './NavigationMenu.styles'
import CameraIcon from "../../../assets/images/navigation-menu/camera.svg"
import GalleryIcon from "../../../assets/images/navigation-menu/gallery-icon.svg"
import { useOnClickOutside } from 'usehooks-ts'

const NavigationMenu: React.FC = () => {
	const [addPhoto, setAddPhoto] = useState(false)
	const ref = useRef(null)

	
	const handleClickOutside = () => {
		setAddPhoto(false)
	  }
	useOnClickOutside(ref, handleClickOutside)
	return (
		<>
			{addPhoto && (
			<View style={styles.modal}>
				<View  ref={ref} style={styles.ways}>
					<Text style={styles.title}>Add photo</Text>
					<View style={styles.wayWrapper}>
					<View style={[styles.container, styles.firstContainer]}>
							<CameraIcon width={40} height={40}/>
							<Text style={styles.way}>Camera</Text>
						</View>
						<View style={styles.container}>
							<GalleryIcon style={styles.iconGallery} width={30} height={30}/>
							<Text style={styles.way}>Gallery</Text>
						</View>
					</View>
				</View>
			</View>
			)}

			<View style={styles.root}>
				<View style={styles.wrapper}>
					{menuList.map(item => (
						<View style={styles.item} key={item.id}>
							{item.id === 3 ? (
								<View style={styles.addPhotoWrapper}>
									<TouchableOpacity onPress={() => setAddPhoto(!addPhoto)}>
										<item.icon style={styles.createIcon} fill='#ee9938' />
									</TouchableOpacity>
								</View>
							) : (
								<item.icon style={styles.icon} />
							)}
							<Text style={styles.label}>{item.label}</Text>
						</View>
					))}
				</View>
			</View>
		</>
	)
}
export default NavigationMenu
