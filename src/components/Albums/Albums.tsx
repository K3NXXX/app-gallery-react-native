import React, { useEffect, useState } from 'react'
import {
	Animated,
	Easing,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Loading from '../../ui/Loading/Loading'
import Logo from '../../ui/Logo/Logo'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import SortPanel from '../../ui/SortPanel/SortPanel'
import AlbumAddingForm from './AlbumAddingForm/AlbumAddingForm'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useGetAllAlbumsQuery } from '../../hooks/albums/useGetAllAlbumsQuery'
import { SCREENS } from '../../constants/screens.constants'
import AddAlbumIcon from '../../../assets/images/albums/add-album.svg'
import CreateIcon from '../../../assets/images/albums/create-album.svg'
import NoImageIcon from '../../../assets/images/albums/no-image-icon.svg'
import { IAlbum } from '../../@types/albums/albums.types'
import { styles } from './Albums.styles'

const Albums: React.FC = () => {
	const [openAlbumAddingForm, setOpenAlbumAddingForm] = useState(false)
	const [filteredAlbums, setFilteredAlbums] = useState<IAlbum[] | undefined>(
		undefined
	)
	const fadeAnim = useState(new Animated.Value(0))[0]
	const navigation = useNavigation()
	const { allAlbums, isLoading, isFetching } = useGetAllAlbumsQuery()

	useEffect(() => {
		if (allAlbums) {
			setFilteredAlbums(allAlbums)
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 400,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}).start()
		}
	}, [allAlbums])

	if (isLoading && !isFetching) {
		return <Loading />
	}

	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Logo />
				{!allAlbums?.length ? (
					<View style={styles.createAlbum}>
						<Text style={styles.text1}>There is no albums</Text>
						<Text style={styles.text2}>Create a new one</Text>
						<TouchableOpacity onPress={() => setOpenAlbumAddingForm(true)}>
							<AddAlbumIcon width={70} height={70} />
						</TouchableOpacity>
					</View>
				) : (
					<Animated.View style={{ opacity: fadeAnim }}>
						<Text style={styles.title}>Albums</Text>
						<SortPanel<IAlbum>
							onFilter={setFilteredAlbums}
							fromWhichPage='albums'
						/>
						<TouchableOpacity
							onPress={() => setOpenAlbumAddingForm(true)}
							style={styles.createNewAlbum}
						>
							<Text style={styles.createNewAlbumText}>Create new album</Text>
							<CreateIcon width={20} height={20} />
						</TouchableOpacity>
						<FlatList
							data={filteredAlbums}
							keyExtractor={item => item.id.toString()}
							numColumns={2}
							contentContainerStyle={{ paddingBottom: 350 }}
							showsVerticalScrollIndicator={false}
							renderItem={({ item }) => (
								<TouchableOpacity
									key={item.id}
									style={styles.albumContainer}
									onPress={() =>
										//@ts-ignore
										navigation.navigate(SCREENS.FULL_ALBUM, {
											albumId: item.id,
										})
									}
								>
									<View>
										{item.imageUrl ? (
											<Image
												source={{ uri: item.imageUrl }}
												style={styles.album}
											/>
										) : (
											<View style={styles.noImageWrapper}>
												<NoImageIcon width={130} height={190} />
											</View>
										)}
										<Text style={styles.albumName}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
					</Animated.View>
				)}
			</View>
			{openAlbumAddingForm && (
				<AlbumAddingForm setOpenAlbumAddingForm={setOpenAlbumAddingForm} />
			)}
			<NavigationMenu />
		</View>
	)
}

export default Albums
