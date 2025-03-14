import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { menuList } from '../../lists/menu.list'
import { styles } from './NavigationMenu.styles'

const NavigationMenu: React.FC = () => {
	const [addPhoto, setAddPhoto] = useState(false)

	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				{menuList.map(item => (
					<View style={styles.item} key={item.id}>
						{item.id === 3 ? (
							<View style={styles.addPhotoWrapper}>
								{addPhoto && (
									<View style={styles.ways}>
										<View style={styles.ways}>
											<Text style={styles.way}>Create photo</Text>
											<Text style={styles.way}>Add photo from gallery</Text>
											<View style={styles.tail} />
										</View>
									</View>
								)} 

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
	)
}

export default NavigationMenu
