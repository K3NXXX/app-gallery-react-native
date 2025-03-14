import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import Navigation from './src/navigation/Navigation'
import { ToastContainer, toast } from 'react-toastify';

export default function App() {
	const queryClient = new QueryClient()
	const [isLoaded] = useFonts({
		'inter-bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
		'inter-regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
		'inter-medium': require('./assets/fonts/Inter_18pt-Medium.ttf'),
	})

	const handleOnLayout = useCallback(async () => {
		if (isLoaded) {
			await SplashScreen.hideAsync()
		}
	}, [isLoaded])

	if (!isLoaded) {
		return null
	}
	return (
		<QueryClientProvider client={queryClient}>
			<View style={styles.container} onLayout={handleOnLayout}>
				<Navigation />
				<ToastContainer position='bottom-left' />
			</View>
		</QueryClientProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
