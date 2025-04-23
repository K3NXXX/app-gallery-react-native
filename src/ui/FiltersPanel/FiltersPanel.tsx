import React, { useState } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import BrightnessIcon from '../../../assets/images/filters/brightness-icon.svg'
import ContrastIcon from '../../../assets/images/filters/contrast-icon.svg'
import RotateIcon from '../../../assets/images/filters/rotate-icon.svg'
import FilterSlider from '../FilterSlider/FilterSlider'
import { styles } from './FiltersPanel.styles'
import { useAddPhotoMutation } from '../../hooks/photos/useAddPhotoMutation'

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
	const [brightness, setBrightness] = useState(0)
	const [contrast, setContrast] = useState(1)
	const [showBrightnessSlider, setShowBrightnessSlider] = useState(false)
	const [showContrastSlider, setShowContrastSlider] = useState(false)
	const {createPhoto} = useAddPhotoMutation()

	const image = currentPhotoUrl.uri
	if (!image) {
		return null
	}

	const handleBrightnessChange = (value: number[]) => {
		setBrightness(value[0])
	}

	const handleContrastChange = (value: number[]) => {
		setContrast(value[0])
	}

	const handleConfirmFilter = () => {
		setShowBrightnessSlider(false)
		setShowContrastSlider(false)
	}

	const handleAddPhotoWithFilters = () => {
		createPhoto({url:})
	}
 
	return (
		<Modal visible={isFiltersOpened} transparent>
			<View style={styles.root}>
				<View style={styles.top}>
					<Image
						style={[
							styles.image,
							{
								filter: `brightness(${1 + brightness}) contrast(${contrast})`,
							},
						]}
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

						<TouchableOpacity
							style={styles.buttonFilter}
							onPress={() => {
								setShowBrightnessSlider(!showBrightnessSlider)
								setShowContrastSlider(false)
							}}
						>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<BrightnessIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Brightness</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonFilter}
							onPress={() => {
								setShowContrastSlider(!showContrastSlider)
								setShowBrightnessSlider(false)
							}}
						>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<ContrastIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Contrast</Text>
							</View>
						</TouchableOpacity>
					</View>

					{showBrightnessSlider && (
						<FilterSlider
							label='Brightness'
							value={brightness}
							min={-1}
							max={1}
							onChange={handleBrightnessChange}
						/>
					)}

					{showContrastSlider && (
						<FilterSlider
							label='Contrast'
							value={contrast}
							min={0}
							max={4}
							onChange={handleContrastChange}
						/>
					)}
					{showBrightnessSlider || showContrastSlider ? (
						<View >
							<TouchableOpacity onPress={() => handleConfirmFilter()} >
								<Text style={styles.cancel}>Confirm</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.bottomBottom}>
							<TouchableOpacity onPress={() => setIsFiltersOpened(false)}>
								<Text style={styles.cancel}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={styles.save}>Save photo</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</View>
		</Modal>
	)
}

export default FiltersPanel
