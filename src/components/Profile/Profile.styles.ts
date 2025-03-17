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
	},
	title: {
		fontSize: 16,
		fontFamily: 'inter-medium',
		color: 'black',
		textAlign: 'center',
		marginBottom: 30,
	},
	noAvatar: {
		width: 150,
		height: 150,
	},
	avatarWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
	},
	info: {
		alignItems: 'center',
	},
	name: {
		fontSize: 20,
		fontFamily: 'inter-bold',
		color: 'black',
		marginBottom: 20,
	},
	personalInfo: {
		width: '100%',
	},
	personalInfoTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10
	},
	personalInfoText: {
		color: '#505050',
		fontSize: 16,
		fontFamily: 'inter-bold',
	},
	personalInfoEdit: {
		color: 'gray',
		fontFamily: 'inter-medium',
		fontSize: 16,
	},
	row: {
		backgroundColor: '#dfe8ef',
		paddingVertical: 14,
		paddingHorizontal: 16,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 20,
		marginBottom: 10
	},
	rowLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	rowText: {
		color: 'gray',
		fontFamily: 'inter-medium',
		marginLeft: 10,
	},
	rowRight: {
		color: 'black',
		fontFamily: 'inter-medium',
		marginLeft: 10,
	},
	utilitiesInfoTop: {
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 10
	}
})
