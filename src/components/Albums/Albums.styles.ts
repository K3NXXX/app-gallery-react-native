import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	wrapper: {
		maxWidth: 500,
		width: '100%',
		paddingTop: 70,
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
	createAlbum: {
		alignItems: 'center',
		paddingTop: 100
	},
	text1: {
		fontSize: 20,
		fontFamily: 'inter-medium',
	},
	text2: {
		fontSize: 25,
		fontFamily: 'inter-bold',
		marginBottom: 20
	},
})
