import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgb(0,0,0)',
		zIndex: 999999,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 20,
	},
	top: {
		paddingTop: 150,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		width: 300,
		height: 300,
		justifyContent: 'center',
		alignItems: 'center',
	},

	bottom: {
		width: '100%',
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		paddingHorizontal: 15,
	},
	buttonWrapper: {
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontFamily: 'inter-medium',
	},
	iconWrapper: {
		padding: 14,
		backgroundColor: '#383838',
		borderRadius: 50,
		marginBottom: 7,
	},
	bottomTop: {
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingBottom: 12,
		marginBottom: 15,
		justifyContent: 'space-around',
		minWidth: '100%',
		paddingHorizontal: 20
	},
	bottomBottom: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		paddingHorizontal: 20,
	},
	buttonFilter: {
		marginRight: 30,
	},
	cancel: {
		color: 'white',
		fontFamily: 'inter-bold',
		fontSize: 17,
	},
	save: {
		color: 'white',
		fontFamily: 'inter-bold',
		fontSize: 17,
		paddingVertical: 7,
		paddingHorizontal: 12,
		borderRadius: 20,
		backgroundColor: 'rgba(102, 102, 102, 0.5)',
	},
	image: {
		width: 300,
		height: 500,
	},
	sliderContainer: {
		marginVertical: 20,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	slider: {
		width: '80%',
		height: 40,
	},
	sliderValue: {
		fontSize: 16,
		color: '#fff',
		textAlign: 'center',
		marginBottom: 10, // Розташування значення над слайдером
	},
	sliderLabel: {
		color: '#fff',
		fontSize: 14,
		marginBottom: 8,
		textAlign: 'center',
	},
	sliderMarks: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 10,
		width: 280,
		alignSelf: 'center',
	},
	
})
