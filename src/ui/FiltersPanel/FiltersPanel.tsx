import React from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import RotateIcon from '../../../assets/images/filters/rotate-icon.svg'
import { styles } from './FiltersPanel.styles'

interface IFiltersPanelProps {
	isFiltersOpened: boolean
	setIsFiltersOpened: (isFiltersOpened: boolean) => void
	currentPhotoUrl: { uri: string }
}

const FiltersPanel: React.FC<IFiltersPanelProps> = ({
	isFiltersOpened,
	setIsFiltersOpened,
	currentPhotoUrl,
}) => {
	console.log(currentPhotoUrl)
	return (
		<Modal visible={isFiltersOpened} transparent>
			<View style={styles.root}>
				<View style={styles.top}>
					<Image
						resizeMode='contain'
						style={styles.image}
						source={{ uri: currentPhotoUrl.uri }}
					/>
				</View>
				<View style={styles.bottom}>
					<View style={styles.bottomTop}>
						<TouchableOpacity style={styles.buttonFilter}>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<RotateIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Rotation</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonFilter}>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<RotateIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Rotation</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.buttonFilter}>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<RotateIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Rotation</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.bottomBottom}>
						<TouchableOpacity onPress={() => setIsFiltersOpened(false)}>
							<Text style={styles.cancel}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity>
							<Text style={styles.save}>Save photo</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default FiltersPanel
