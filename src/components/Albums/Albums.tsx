import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AddAlbumIcon from '../../../assets/images/albums/add-album.svg'
import NavigationMenu from '../../ui/NavigationMenu/NavigationMenu'
import { styles } from './Albums.styles'
import AlbumAddingForm from './AlbumAddingForm/AlbumAddingForm'
import { useGetAllAlbumsQuery } from '../../hooks/albums/useGetAllAlbumsQuery'

const Albums: React.FC = () => {
	const [openAlbumAddingForm, setOpenAlbumAddingForm] = useState(false)
	const {allAlbums} = useGetAllAlbumsQuery()
	console.log(allAlbums)
	return (
		<View style={styles.root}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Albums</Text>
				{allAlbums?.length === 0 ? (
					<View style={styles.createAlbum}>
					<Text style={styles.text1}>There is no albums</Text>
					<Text style={styles.text2}>Create a new one</Text>
					<TouchableOpacity onPress={() => setOpenAlbumAddingForm(true)}>
						<AddAlbumIcon width={70} height={70} />
					</TouchableOpacity>
				</View>
				) : (
					<View></View>
				)}
			</View>
			{openAlbumAddingForm && <AlbumAddingForm setOpenAlbumAddingForm={setOpenAlbumAddingForm}/>}
			<NavigationMenu />
		</View>
	)
}

export default Albums
