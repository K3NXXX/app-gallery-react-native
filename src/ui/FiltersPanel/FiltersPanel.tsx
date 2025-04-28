import React, { useState } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import BrightnessIcon from '../../../assets/images/filters/brightness-icon.svg'
import ContrastIcon from '../../../assets/images/filters/contrast-icon.svg'
import RotateIcon from '../../../assets/images/filters/rotate-icon.svg'
import SaturationIcon from '../../../assets/images/filters/saturation-icon.svg'
import SepiaIcon from '../../../assets/images/filters/sepia-icon.svg'
import CropIcon from '../../../assets/images/filters/crop-icon.svg'
import { ScrollView } from 'react-native'; 

import { useAddPhotoMutation } from '../../hooks/photos/useAddPhotoMutation'
import FilterSlider from '../FilterSlider/FilterSlider'
import { styles } from './FiltersPanel.styles'
import ImagePicker from 'react-native-image-crop-picker';

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
	const [saturation, setSaturation] = useState(1)
	const [sepia, setSepia] = useState(0)
	const [showBrightnessSlider, setShowBrightnessSlider] = useState(false)
	const [showContrastSlider, setShowContrastSlider] = useState(false)
	const [showSaturationSlider, setShowSaturationSlider] = useState(false)
	const [showSepiaSlider, setShowSepiaSlider] = useState(false)
	const { createPhoto } = useAddPhotoMutation()

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

	const handleSaturationChange = (value: number[]) => {
		setSaturation(value[0])
	}

	const handleSepiaChange = (value: number[]) => {
		setSepia(value[0])
	}

	const handleConfirmFilter = () => {
		setShowBrightnessSlider(false)
		setShowContrastSlider(false)
		setShowSaturationSlider(false)
		setShowSepiaSlider(false)
	}

	const openCropper = () => {
		ImagePicker.openCropper({
			path: currentPhotoUrl.uri,
			width: 300,
			height: 400
		  }).then(image => {
			console.log(image);
		  });
	}

	const handleAddPhotoWithFilters = async () => {
	}

	return (
		<Modal visible={isFiltersOpened} transparent>
			<View style={styles.root}>
				<View style={styles.top}>
					<Image
						style={[
							styles.image,
							//@ts-ignore
							{
								filter: `brightness(${
									1 + brightness
								}) contrast(${contrast}) saturate(${saturation}) sepia(${sepia})`,
							},
						]}
						source={{ uri: currentPhotoUrl.uri }}
					/>
				</View>
				<View style={styles.bottom}>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.bottomTop}
						
					>
						<TouchableOpacity style={styles.buttonFilter}>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<RotateIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Rotation</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => openCropper()} style={styles.buttonFilter}>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<CropIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Cropping</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonFilter}
							onPress={() => {
								setShowBrightnessSlider(!showBrightnessSlider)
								setShowContrastSlider(false)
								setShowSaturationSlider(false)
								setShowSepiaSlider(false)
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
								setShowSaturationSlider(false)
								setShowSepiaSlider(false)
							}}
						>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<ContrastIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Contrast</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonFilter}
							onPress={() => {
								setShowSaturationSlider(!showSaturationSlider)
								setShowBrightnessSlider(false)
								setShowContrastSlider(false)
								setShowSepiaSlider(false)
							}}
						>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<SaturationIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Saturation</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.buttonFilter}
							onPress={() => {
								setShowSepiaSlider(!showSepiaSlider)
								setShowBrightnessSlider(false)
								setShowContrastSlider(false)
								setShowSaturationSlider(false)
							}}
						>
							<View style={styles.buttonWrapper}>
								<View style={styles.iconWrapper}>
									<SepiaIcon width={30} height={30} />
								</View>
								<Text style={styles.buttonText}>Sepia</Text>
							</View>
						</TouchableOpacity>
					</ScrollView>

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

					{showSaturationSlider && (
						<FilterSlider
							label='Saturation'
							value={saturation}
							min={0}
							max={4}
							onChange={handleSaturationChange}
						/>
					)}

					{showSepiaSlider && (
						<FilterSlider
							label='Sepia'
							value={sepia}
							min={0}
							max={1}
							onChange={handleSepiaChange}
						/>
					)}

					{showBrightnessSlider ||
					showContrastSlider ||
					showSaturationSlider ||
					showSepiaSlider ? (
						<View>
							<TouchableOpacity onPress={() => handleConfirmFilter()}>
								<Text style={styles.cancel}>Confirm</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.bottomBottom}>
							<TouchableOpacity onPress={() => setIsFiltersOpened(false)}>
								<Text style={styles.cancel}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => handleAddPhotoWithFilters()}>
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
