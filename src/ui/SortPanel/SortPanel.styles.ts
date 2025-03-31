import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
	  filterWays: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
		marginBottom: 15
	  },
	  filterBtn: {
		backgroundColor: "rgb(230, 230, 230)",
		padding: 10,
		borderRadius: 12,
		width: "44%"
	  },
	  filterBtnText :{
		color: "#747474",
		fontFamily: "inter-bold",
		fontSize: 14,
		textAlign: "center"
	  },
	  sortByNameRoot: {
		position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: "rgba(0,0,0,0.9)",
			zIndex: 999999,
			justifyContent: "flex-start",
			paddingBottom: 20,
			paddingHorizontal: 20,
			paddingTop: 200
	  },
	  sortByNameTitle :{
		color: "#ee9938",
		fontFamily: "inter-bold",
		fontSize: 24,
		marginRight: 15
	  },
	  titleWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15
	  },
	  returnIcon: {
		position: "absolute",
		top: 40,
		right: 40
	  },
	  sortWays:{
		
	  },
	  sortWay: {
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingVertical: 13,
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: 'center',
		marginBottom: 12

	  },
	  sortWayText: {
		color: "#000000",
		fontFamily: 'inter-bold',
		fontSize: 16
	  },
	  selectedCircle :{
		backgroundColor: "#ee9938",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderColor: 'black',
		borderWidth: 2
	  },
	  circle: {
		backgroundColor: "#ffffff",
		width: 25,
		height: 25,
		borderRadius: 100,
		borderColor: 'black',
		borderWidth: 2
	  },
	  removeFilters: {
		color: "#ee9938",
		fontFamily: "inter-bold",
		fontSize: 16,
		marginRight: 15,
		marginTop: 20
	  }
})
