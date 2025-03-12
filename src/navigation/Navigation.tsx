import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SCREENS } from '../constants/screens.constants'
import SignUpScreen from '../screens/SignUpScreen'
import LogInScreen from '../screens/LogInScreen'

const Stack = createStackNavigator()

const Navigation: React.FC = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={SCREENS.SIGNUP}>
				<Stack.Screen name={SCREENS.SIGNUP} component={SignUpScreen} />
				<Stack.Screen name={SCREENS.LOGIN} component={LogInScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
