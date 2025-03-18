import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import LogOutIcon from '../../../assets/images/profile/logout.svg'
import NoAvatarIcon from '../../../assets/images/profile/no-avatar.png'
import EmailIcon from '../../../assets/images/sign-up/email.svg'
import PasswordIcon from '../../../assets/images/sign-up/password.svg'
import UserIcon from '../../../assets/images/sign-up/user.svg'
import { IUser } from '../../@types/auth/user.types'
import { SCREENS } from '../../constants/screens.constants'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from '../Profile/Profile.styles'
import EditDataForm from './EditDataForm/EditDataForm'
import { useGetMe } from '../../hooks/auth/useGetMe'

const Profile: React.FC = () => {
	const { reset } = useNavigation()
	const [openEditForm, setOpenEditForm] = useState(false)
	const {userData} = useGetMe()
	console.log(userData)

	const logout = async () => {
		await AsyncStorage.removeItem('token')
		reset({
			index: 0,
			//@ts-ignore
			routes: [{ name: SCREENS.LOGIN }],
		})
	}
	
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Your profile</Text>
				<View style={styles.avatarWrapper}>
					<Image style={styles.noAvatar} source={NoAvatarIcon} />
				</View>
				<View style={styles.info}>
					<Text style={styles.name}>{userData?.user?.name}</Text>
					<View style={styles.personalInfo}>
						<View style={styles.personalInfoTop}>
							<Text style={styles.personalInfoText}>Personal info</Text>
							<TouchableOpacity onPress={() => setOpenEditForm(true)}>
								<Text style={styles.personalInfoEdit}>Edit</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<EmailIcon width={25} height={25} />
							<Text style={styles.rowText}>Email</Text>
						</View>
						<Text style={styles.rowRight}>{userData?.user?.email}</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<PasswordIcon width={25} height={25} />
							<Text style={styles.rowText}>Password</Text>
						</View>
						<Text style={styles.rowRight}>**************</Text>
					</View>
					<View style={styles.row}>
						<View style={styles.rowLeft}>
							<UserIcon width={25} height={25} />
							<Text style={styles.rowText}>Name</Text>
						</View>
						<Text style={styles.rowRight}>{userData?.user.name}</Text>
					</View>
					<View style={styles.utilitiesInfoTop}>
						<Text style={styles.personalInfoText}>Utilities</Text>
					</View>
					<TouchableOpacity onPress={logout} style={styles.row}>
						<View style={styles.rowLeft}>
							<LogOutIcon width={25} height={25} />
							<Text style={styles.rowText}>Logout</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			{openEditForm && <EditDataForm setOpenEditForm={setOpenEditForm} />}

			<NavigationMenu />
		</View>
	)
}

export default Profile
