import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 100,
	},
	photoContainer: {
		width: '31%',
		margin: 5,
	},
	photo: {
		height: 120,
		resizeMode: 'cover',
		opacity: 1,
	},
	selectedImage: {
		width: 120,
		height: 115,
		borderRadius: 10,
		marginBottom: 5,
		opacity: 0.7,
	},
	selectedImageWrapper: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	top: {
		justifyContent: 'space-between',
		position: 'absolute',
		top: 35,
		left: 30,
	},
	selected: {
		color: 'white',
		fontFamily: 'inter-bold',
		fontSize: 18,
	},
	add: {
		color: 'rgb(255, 167, 56)',
		fontFamily: 'inter-bold',
		fontSize: 25,
	},
	returnIcon: {
		position: 'absolute',
		top: 40,
		right: 40,
		zIndex: 100,
	},
	list: {
		height: 650,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
	},

	checkMark: {
		position: 'absolute',
		top: 5,
		right: 5,
	},
	photoWrapper: {
		position: 'relative',
	},
	addRow: {
		backgroundColor: 'rgba(37, 37, 37, 0.9)',
		bottom: 40,
		position: 'absolute',
		width: 380,
		alignSelf: 'center',
		borderRadius: 20,
		padding: 8,
		paddingHorizontal: 10,
		zIndex: 300,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	addImagesBtn: {
		backgroundColor: 'rgb(241, 149, 36)',

		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 15,
	},
	addImagesBtnText: {
		color: 'white',
		fontFamily: 'inter-bold',
		textAlign: 'center',
		fontSize: 15,
	},
})
