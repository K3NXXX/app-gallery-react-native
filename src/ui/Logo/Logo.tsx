import React from 'react';
import { Text, View } from 'react-native'
import LogoIcon from "../../../assets/images/home/logo-icon.svg"
import { styles } from './Logo.styles'

const Logo: React.FC = () => {
	return (
		<View style={styles.logo}>
		<LogoIcon width={40} height={40}/>
		<Text style={styles.logoText}>Snapture</Text>
	</View>
	);
};

export default Logo;