import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import EditDataForm from './EditDataForm/EditDataForm'
import { useNavigation } from '@react-navigation/native'
import { useClickOutside } from 'react-native-click-outside'
import { useDeleteUserAvatarMutation } from '../../hooks/auth/useDeleteUserAvatarMutation'
import { useGetMe } from '../../hooks/auth/useGetMe'
import { useUpdateUserAvatarMutation } from '../../hooks/auth/useUpdateUserAvatarMutation'
import { handleUploadImage } from '../../utils/handleUploadImage'
import { useAuthStore } from '../../zustand/useAuthStore'
import { SCREENS } from '../../constants/screens.constants'
import CameraIcon from '../../../assets/images/navigation-menu/camera.svg'
import GalleryIcon from '../../../assets/images/navigation-menu/gallery-icon.svg'
import EditIcon from '../../../assets/images/profile/edit-icon.svg'
import LogOutIcon from '../../../assets/images/profile/logout.svg'
import NoAvatarIcon from '../../../assets/images/profile/no-avatar.png'
import PlusIcon from '../../../assets/images/profile/plus-icon.svg'
import DeleteIcon from '../../../assets/images/profile/trash-icon.svg'
import EmailIcon from '../../../assets/images/sign-up/email.svg'
import PasswordIcon from '../../../assets/images/sign-up/password.svg'
import UserIcon from '../../../assets/images/sign-up/user.svg'
import { styles } from '../Profile/Profile.styles'

const Profile: React.FC = () => {
	const [isAvatarFormOpened, setIsAvatarOpened] = useState(false)
	const [isEditAvatarFormOpened, setIsEditAvatarOpened] = useState(false)
	const [openEditForm, setOpenEditForm] = useState(false)

	const { reset } = useNavigation()
	const { userData } = useGetMe()
	const { updateAvatar } = useUpdateUserAvatarMutation()
	const { deleteAvatar, deleteAvatarSuccess } = useDeleteUserAvatarMutation()
	const logOut = useAuthStore((state) => state.logout)
	
	const avatarFormOpenedRef = useClickOutside<View>(() =>
		setIsAvatarOpened(false)
	)
	const avatarEditFormOpenedRef = useClickOutside<View>(() =>
		setIsEditAvatarOpened(false)
	)

	const handleUploadNewAvatar = () => {
		setIsAvatarOpened(true)
		setIsEditAvatarOpened(false)
	}

	const logout = async () => {
		await AsyncStorage.removeItem('token')
		logOut()
		reset({
			index: 0,
			//@ts-ignore
			routes: [{ name: SCREENS.LOGIN }],
		})
	}


	useEffect(() => {
		if (deleteAvatarSuccess) setIsEditAvatarOpened(false)
	}, [deleteAvatarSuccess])


	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Your profile</Text>
				<View style={styles.avatarWrapper}>
					{userData?.user.avatar ? (
						<Image
							style={styles.noAvatar}
							source={{ uri: userData.user.avatar }}
						/>
					) : (
						<Image style={styles.noAvatar} source={NoAvatarIcon} />
					)}

					{userData?.user.avatar ? (
						<TouchableOpacity
							onPress={() => setIsEditAvatarOpened(true)}
							style={styles.addIcon}
						>
							<EditIcon width={42} height={42} />
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							onPress={() => setIsAvatarOpened(true)}
							style={styles.addIcon}
						>
							<PlusIcon width={40} height={40} />
						</TouchableOpacity>
					)}
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

			{isAvatarFormOpened && (
				<View style={styles.modal}>
					<View ref={avatarFormOpenedRef} style={styles.ways}>
						<Text style={styles.titlePhoto}>Upload avatar</Text>
						<View style={styles.wayWrapper}>
							<Pressable
								onPress={() => handleUploadImage(undefined, updateAvatar)}
							>
								<View style={[styles.container, styles.firstContainer]}>
									<CameraIcon width={40} height={40} />
									<Text style={styles.way}>Camera</Text>
								</View>
							</Pressable>
							<Pressable
								onPress={() => handleUploadImage('gallery', updateAvatar, 'profile')}
							>
								<View style={styles.container}>
									<GalleryIcon
										style={styles.iconGallery}
										width={30}
										height={30}
									/>
									<Text style={styles.way}>Gallery</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			{isEditAvatarFormOpened && (
				<View style={styles.modal}>
					<View ref={avatarEditFormOpenedRef} style={styles.ways}>
						<Text style={styles.titlePhoto}>Edit avatar</Text>
						<View style={styles.wayWrapper}>
							<Pressable
								onPress={() => handleUploadNewAvatar()}
							>
								<View style={[styles.container, styles.firstContainer]}>
									<CameraIcon width={40} height={40} />
									<Text style={styles.way}>Upload new</Text>
								</View>
							</Pressable>
							<Pressable onPress={() => deleteAvatar()}>
								<View style={styles.container}>
									<DeleteIcon
										style={styles.iconGallery}
										width={30}
										height={30}
									/>
									<Text style={styles.way}>Delete avatar</Text>
								</View>
							</Pressable>
						</View>
					</View>
				</View>
			)}

			<NavigationMenu />
		</View>
	)
}

export default Profile
