import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 20
	},
	label: {
		color: 'white',
		marginBottom: 8,
		fontSize: 16,
	},
	sliderWrapper: {
		position: 'relative',
		marginBottom: 8,
	},
	marks: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: 280,
		position: 'absolute',
		bottom: 0,
		zIndex: 1,
	},
	mark: {
		width: 1,
		height: 6,
		backgroundColor: '#888',
		opacity: 0.6,
	},
	markLarge: {
		height: 10,
		opacity: 1,
	},
	slider: {
		width: 290,
		paddingHorizontal: 10,
	},
	track: {
		height: 6,
		borderRadius: 3,
		backgroundColor: '#3a3a3c',
	},
	thumb: {
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: '#ff9500',
		borderWidth: 2,
		borderColor: '#fff',
		shadowColor: '#ff9500',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.7,
		shadowRadius: 6,
		elevation: 4,
	},
})
