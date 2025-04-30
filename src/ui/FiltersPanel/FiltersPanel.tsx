import React, { useRef, useState } from 'react'
import {
	Image,
	Modal,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { captureRef } from 'react-native-view-shot'
import BrightnessIcon from '../../../assets/images/filters/brightness-icon.svg'
import ContrastIcon from '../../../assets/images/filters/contrast-icon.svg'
import GrayscaleIcon from '../../../assets/images/filters/grayscale-icon.svg'
import MirrorIcon from '../../../assets/images/filters/mirror-icon.svg'
import RotateIcon from '../../../assets/images/filters/rotate-icon.svg'
import SaturationIcon from '../../../assets/images/filters/saturation-icon.svg'
import SepiaIcon from '../../../assets/images/filters/sepia-icon.svg'
import { useAddPhotoMutation } from '../../hooks/photos/useAddPhotoMutation'
import ConfirmClearFilters from '../ConfirmClearFilters/ConfirmClearFilters'
import FilterSlider from '../FilterSlider/FilterSlider'
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
	const [brightness, setBrightness] = useState(0)
	const [contrast, setContrast] = useState(1)
	const [saturation, setSaturation] = useState(1)
	const [sepia, setSepia] = useState(0)
	const [isMirrored, setIsMirrored] = useState(false)

	const [showBrightnessSlider, setShowBrightnessSlider] = useState(false)
	const [showContrastSlider, setShowContrastSlider] = useState(false)
	const [showSaturationSlider, setShowSaturationSlider] = useState(false)
	const [showSepiaSlider, setShowSepiaSlider] = useState(false)
	const [grayscale, setGrayscale] = useState(0)
	const [showGrayscaleSlider, setShowGrayscaleSlider] = useState(false)
	const [isFilterCancel, setIsFilterCancel] = useState(false)

	const { createPhoto } = useAddPhotoMutation()
	const imageViewRef = useRef<View>(null)

	const hasFilters =
		brightness !== 0 ||
		contrast !== 1 ||
		saturation !== 1 ||
		sepia !== 0 ||
		grayscale !== 0 ||
		isMirrored === true

	const handleGrayscaleChange = (value: number[]) => {
		setGrayscale(value[0])
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
		setShowGrayscaleSlider(false)
	}

	const clearAllFilters = () => {
		setBrightness(0)
		setContrast(1)
		setSaturation(1)
		setSepia(0)
		setGrayscale(0)
		setShowBrightnessSlider(false)
		setShowContrastSlider(false)
		setShowSaturationSlider(false)
		setShowSepiaSlider(false)
		setShowGrayscaleSlider(false)
		setIsMirrored(false)
	}

	const handleCancelFilters = () => {
		if (hasFilters) {
			setIsFilterCancel(true)
		} else {
			setIsFiltersOpened(false)
		}
	}

	const saveFilteredPhoto = async () => {
		try {
			const uri = await captureRef(imageViewRef, {
				format: 'png',
				quality: 1,
			})
			createPhoto({ url: uri })
			setIsFiltersOpened(false)
		} catch (error) {
			console.error('Failed to save photo', error)
		}
	}

	const image = currentPhotoUrl.uri
	if (!image) {
		return null
	}

	return (
		<>
			<Modal visible={isFiltersOpened} transparent>
				<View style={styles.root}>
					<View ref={imageViewRef} collapsable={false}>
						<Image
							style={[
								styles.image,
								//@ts-ignore
								{
									filter: `brightness(${
										1 + brightness
									}) contrast(${contrast}) saturate(${saturation}) sepia(${sepia}) grayscale(${grayscale})`,
									transform: [{ scaleX: isMirrored ? -1 : 1 }],
								},
							]}
							source={{ uri: currentPhotoUrl.uri }}
						/>
					</View>
					<View style={styles.middle}></View>
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

							<TouchableOpacity
								style={styles.buttonFilter}
								onPress={() => setIsMirrored(!isMirrored)}
							>
								<View style={styles.buttonWrapper}>
									<View style={styles.iconWrapper}>
										<MirrorIcon width={30} height={30} />
									</View>
									<Text style={styles.buttonText}>Mirror</Text>
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

							<TouchableOpacity
								style={styles.buttonFilter}
								onPress={() => {
									setShowGrayscaleSlider(!showGrayscaleSlider)
									setShowBrightnessSlider(false)
									setShowContrastSlider(false)
									setShowSaturationSlider(false)
									setShowSepiaSlider(false)
								}}
							>
								<View style={styles.buttonWrapper}>
									<View style={styles.iconWrapper}>
										<GrayscaleIcon width={30} height={30} />
									</View>
									<Text style={styles.buttonText}>Grayscale</Text>
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

						{showGrayscaleSlider && (
							<FilterSlider
								label='Grayscale'
								value={grayscale}
								min={0}
								max={1}
								onChange={handleGrayscaleChange}
							/>
						)}

						{showBrightnessSlider ||
						showContrastSlider ||
						showSaturationSlider ||
						showGrayscaleSlider ||
						showSepiaSlider ? (
							<View>
								<TouchableOpacity onPress={() => handleConfirmFilter()}>
									<Text style={styles.cancel}>Confirm</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View style={styles.bottomBottom}>
								<TouchableOpacity onPress={() => handleCancelFilters()}>
									<Text style={styles.cancel}>Cancel</Text>
								</TouchableOpacity>
								<View style={styles.bottomButtonsRow}>
									{hasFilters && (
										<TouchableOpacity onPress={() => clearAllFilters()}>
											<Text style={styles.clear}>Clear filters</Text>
										</TouchableOpacity>
									)}
									{hasFilters && (
										<TouchableOpacity onPress={saveFilteredPhoto}>
											<Text style={styles.save}>Save photo</Text>
										</TouchableOpacity>
									)}
								</View>
							</View>
						)}
					</View>
				</View>
			</Modal>
			{isFilterCancel && (
				<ConfirmClearFilters
					setIsFiltersOpened={setIsFiltersOpened}
					setIsFilterCancel={setIsFilterCancel}
				/>
			)}
		</>
	)
}

export default FiltersPanel
