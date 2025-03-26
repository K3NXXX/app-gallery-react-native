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
	search: {
		position: 'relative',
		marginBottom: 20,
	},
	input: {
		borderRadius: 50,
		backgroundColor: 'rgb(230, 230, 230)',
		paddingHorizontal: 55,
		paddingVertical: 17,
		fontFamily: 'inter-regular',
	},
	searchIcon: {
		position: 'absolute',
		top: 10,
		left: 10,
	},
	closeIcon: {
		position: 'absolute',
		top: 12,
		right: 12,
	},
	imageContainer: {
		marginTop: 20,
	},
	imagePreview: {
		width: 100,
		height: 100,
		borderRadius: 10,
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

	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		zIndex: 10000, 
	},
	editRow: {
		position: 'absolute',
		flexDirection: 'row',
		backgroundColor: 'white',
		right: 2,
		left: 0,
		zIndex: 10,
		height: 60,
		borderEndEndRadius: 20,
		borderStartEndRadius: 20,
		borderBottomColor: "rgb(255, 167, 56)",
		borderWidth: 2,
		borderLeftColor: "rgb(255, 167, 56)",
		borderRightColor: "rgb(255, 167, 56)"
	},

	deleteButton: {
		padding: 13,
		borderRadius: 50,
	},
	editButton: {
		backgroundColor: "rgb(255, 167, 60)",
		padding: 20,
		position: 'absolute',
		bottom: 20,
		right: 20,
		borderRadius: 20
	},
	
	  filtersContainer: {
		position: 'absolute',
		bottom: 120,
		left: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '80%',
	  },
	  filterButton: {
		fontSize: 16,
		color: '#fff',
		padding: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 5,
	  },
	  filteredImage: {
		width: '100%',
		height: '100%',
		borderRadius: 8,
	  },
	  filteredImageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	  
})
