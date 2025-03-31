import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	wrapper: {
		maxWidth: 500,
		width: '100%',
		paddingTop: 60,
		alignSelf: 'center',
		paddingHorizontal: 25,
		flex: 1,
		paddingBottom: 100,
	},
	title: {
		fontSize: 16,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginBottom: 30,
	},
	noPhoto: {
		fontSize: 20,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginTop: 100,
	},
	noPhoto2: {
		fontSize: 22,
		fontFamily: 'inter-bold',
		color: 'black',
		textAlign: 'center',
		marginBottom: 20
	},
	noPhotoContainer: {
		alignItems: 'center'
	},
	photoContainer: {
		width: '31%',
		margin: 5,
	},
	photo: {
		height: 120,
		borderRadius: 10,
		resizeMode: 'cover',
	},
})
