import { createStackNavigator } from '@react-navigation/stack'
import { SCREENS } from '../constants/screens.constants'
import LogInScreen from '../screens/LogInScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const AuthNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen name={SCREENS.LOGIN} component={LogInScreen} />
		<Stack.Screen name={SCREENS.SIGNUP} component={SignUpScreen} />
	</Stack.Navigator>
)
export default AuthNavigator
