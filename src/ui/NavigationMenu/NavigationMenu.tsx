import React from 'react'
import { Text, View } from 'react-native'
import { menuList } from '../../lists/menu.list'
import { styles } from './NavigationMenu.styles'

const NavigationMenu: React.FC = () => {
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				{menuList.map(item => (
					<View style={styles.item} key={item.id}>
						<item.icon
							style={item.id === 3 ? styles.createIcon : styles.icon}
							{...(item.id === 3 ? { fill: '#ee9938' } : {})} 
						/>
						<Text style={styles.label}>{item.label}</Text>
					</View>
				))}
			</View>
		</View>
	)
}

export default NavigationMenu
