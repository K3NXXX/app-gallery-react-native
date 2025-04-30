import React from 'react'
import { Slider } from '@miblanchard/react-native-slider'
import { Text, View } from 'react-native'
import { styles } from './FilterSlider.styles'

interface FilterSliderProps {
	label: string
	value: number
	min: number
	max: number
	step?: number
	onChange: (value: number[]) => void
}

const FilterSlider: React.FC<FilterSliderProps> = ({
	label,
	value,
	min,
	max,
	step = 0.01,
	onChange,
}) => {
	const totalTicks = 10
	const ticks = Array.from({ length: totalTicks + 1 }, (_, i) => i)

	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{label}: {(value * 100).toFixed(0)}%
			</Text>

			<View style={styles.sliderWrapper}>
				<Slider
					value={value}
					minimumValue={min}
					maximumValue={max}
					step={step}
					onValueChange={onChange}
					minimumTrackTintColor='#ff9500'
					maximumTrackTintColor='#3a3a3c'
					trackStyle={styles.track}
					thumbStyle={styles.thumb}
					containerStyle={styles.slider}
				/>
			</View>
			<View style={styles.marks}>
				{ticks.map((_, i) => (
					<View
						key={i}
						style={[styles.mark, i % 5 === 0 && styles.markLarge]}
					/>
				))}
			</View>
		</View>
	)
}

export default FilterSlider
