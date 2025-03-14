import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute', 
		left: 0,
		right: 0,
		bottom: 0, 
		paddingBottom: 40,  
	  },
	wrapper: {
		flexDirection: "row",
		justifyContent: "center"
		
		
	},
	item: {
		alignItems: "center",
		width: "20%"

	},
	icon :{
		width: 25,
		height: 25,
		marginBottom: 6
	},
	label: {
		fontFamily: "inter-medium",
	},
	createIcon: {
		width: 50,
		height: 50,
		
	}

	
	
})
