import { createStackNavigator } from '@react-navigation/stack'
import { SCREENS } from '../constants/screens.constants'
import AlbumsScreen from '../screens/AlbumsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FullAlbumScreen from '../screens/FullAlbumScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()

const AppNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
			name={SCREENS.HOME}
			component={HomeScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name={SCREENS.PROFILE}
			options={{ headerShown: false }}
			component={ProfileScreen}
		/>
	
		<Stack.Screen
			name={SCREENS.ALBUMS}
			component={AlbumsScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name={SCREENS.FAVOURITES}
			component={FavouritesScreen}
			options={{ headerShown: false }}
		/>
		<Stack.Screen
			name={SCREENS.FULL_ALBUM}
			component={FullAlbumScreen}
			options={{ headerShown: false }}
		/>
	</Stack.Navigator>
)
export default AppNavigator
