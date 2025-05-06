import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.9)',
		alignItems: 'center',
		zIndex: 100,
	},
	returnIcon: {
		position: 'absolute',
		top: 40,
		right: 40,
	},
	content: {
		width: '90%',
		paddingTop: 150,
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
	input: {
		width: '68%',
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 14,
		fontSize: 16,
		marginRight: 12
	},

	
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	addHashBtn: {
		backgroundColor: 'rgb(241, 149, 36)',

		paddingVertical: 14,
		paddingHorizontal: 30,
		borderRadius: 15,
	},
	addHashBtnText: {
		color: 'white',
		fontFamily: 'inter-bold',
		textAlign: 'center',
		fontSize: 15,
	},
	list: {
		marginTop: 20
	},
	tagWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		marginBottom: 12
	},
	tag: {
		backgroundColor: '#4A90E2',
		color: '#fff',
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 15,
		marginRight: 10,
		fontSize: 14,
		paddingRight: 30
	},
	deleteIcon: {
		position: 'absolute',
		right: 15
	},
	errorText: {
		color: 'red',
		fontSize: 14,
		marginTop: 5,
	  },
	  uploadTagBtnWrapper: {
		alignItems: 'center'
	  },
	  uploadTagBtn: {
		backgroundColor: 'rgb(241, 149, 36)',
		paddingVertical: 14,
		paddingHorizontal: 30,
		borderRadius: 15,
		width: 300,
		marginTop: 150
	  },
	  existingHashtags: {

	  },
	  existingText: {
		color: 'rgb(255, 167, 56)',
		fontFamily: 'inter-bold',
		fontSize: 18,
	  }
})
