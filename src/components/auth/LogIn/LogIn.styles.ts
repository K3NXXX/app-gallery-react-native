import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#f7f7f7',

	},
	wrapper: {
		maxWidth: 500,
		width: '100%',
		paddingTop: 80,
		alignSelf: 'center',
		paddingHorizontal: 15,

	},
	title: {
		fontFamily: 'inter-bold',
		color: 'rgb(13, 16, 23)',
		fontWeight: '700',
		fontSize: 36,
		marginBottom: 12,
	},
	descr: {
		fontFamily: 'inter-regular',
		color: 'rgb(97, 100, 107)',
		fontSize: 16,
		marginBottom: 50,
	},
	form: {},
	inputWrapper: {
		marginBottom: 20,
	},
	label: {
		fontFamily: 'inter-bold',
		color: 'rgb(39, 42, 49)',
		fontSize: 14,
		marginRight: 5,
	},
	input: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: 'rgb(201, 205, 210)',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
		fontFamily: 'inter-regular',
	},
	top: {
		display: 'flex',
		flexDirection: 'row',
		rowGap: 20,
		marginBottom: 8,
	},
	passwordWrapper: {
		position: 'relative',
	},
	eye: {
		width: 25,
		height: 25,
		position: 'absolute',
		top: 12,
		right: 10,
	},
	button: {
		backgroundColor: 'rgb(255, 167, 56);',
		borderRadius: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingVertical: 15,
		marginTop: 50,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontFamily: 'inter-bold',
	},
	haveAccount: {
		color: 'rgb(97, 100, 107)',
		fontSize: 16,
		fontFamily: 'inter-regular',
		marginTop: 50,
		textAlign: 'center',
	},
	logIn: {
		color: 'rgb(255, 167, 56)',
	},
})
