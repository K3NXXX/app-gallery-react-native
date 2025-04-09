import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { styles } from './Loading.styles'

const Loading: React.FC = () => {
	return (
		<View style={styles.loaderWrapper}>
			<ActivityIndicator size='large' color='orange' />
		</View>
	)
}

export default Loading
