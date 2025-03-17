import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import NoAvatarIcon from '../../../assets/images/profile/no-avatar.png'
import EmailIcon from '../../../assets/images/sign-up/email.svg'
import LogOutIcon from '../../../assets/images/profile/logout.svg'
import { styles } from '../Profile/Profile.styles'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'

const Profile: React.FC = () => {
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Your profile</Text>
				<View style={styles.avatarWrapper}>
					<Image style={styles.noAvatar} source={NoAvatarIcon} />
				</View>
				<View style={styles.info}>
					<Text style={styles.name}>Volodya</Text>
					<View style={styles.personalInfo}>
						<View style={styles.personalInfoTop}>
							<Text style={styles.personalInfoText}>Personal info</Text>
							<TouchableOpacity>
								<Text style={styles.personalInfoEdit}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<EmailIcon width={25} height={25} />
							<Text style={styles.rowText}>Email</Text>
						</View>
						<Text style={styles.rowRight}>xxvolodyax7@gmail.com</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<EmailIcon width={25} height={25} />
							<Text style={styles.rowText}>Password</Text>
						</View>
						<Text style={styles.rowRight}>**************</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<EmailIcon width={25} height={25} />
							<Text style={styles.rowText}>Name</Text>
						</View>
						<Text style={styles.rowRight}>Volodya</Text>
					</View>
					<View style={styles.utilitiesInfoTop}>
						<Text style={styles.personalInfoText}>Utilities</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<LogOutIcon width={25} height={25} />
							<Text style={styles.rowText}>Logout</Text>
						</View>
						
					</View>
				</View>
			</View>
			<NavigationMenu/>
		</View>
	)
}

export default Profile
