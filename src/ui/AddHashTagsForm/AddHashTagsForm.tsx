import React, { useState } from 'react'
import {
	Animated,
	FlatList,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import DeleteHashtagIcon from '../../../assets/images/hashtags/tag-delete-icon.svg'
import ReturnIcon from '../../../assets/images/home/return-icon.svg'
import { IHashtag } from '../../@types/photos/photos.type'
import { useAddTagsToPhotoMutation } from '../../hooks/photos/useAddTagsToPhotoMutation'
import { useDeleteTagFromPhotoMutation } from '../../hooks/photos/useDeleteTagFromPhotoMutation'
import { styles } from './AddHashTagsForm.styles'

interface IAddHashTagsFormProps {
	setIsAddingHashtagFormOpened: (isAddingHashtagFormOpened: boolean) => void
	photoId: number
	existingPhotoHashtags: IHashtag[]
}

const AddHashTagsForm: React.FC<IAddHashTagsFormProps> = ({
	setIsAddingHashtagFormOpened,
	photoId,
	existingPhotoHashtags,
}) => {
	const [inputValue, setInputValue] = useState('')
	const [hashtags, setHashtags] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const { addTagsToPhoto } = useAddTagsToPhotoMutation()
	const { deleteTagFromPhoto } = useDeleteTagFromPhotoMutation()

	const handleAddHashtags = () => {
		const hashtagPattern = /^#[a-zA-Z0-9-]+$/

		const tags = inputValue
			.trim()
			.split(/\s+/)
			.filter(tag => hashtagPattern.test(tag))

		if (tags.length === 0) {
			setError('Please enter some hashtags like #hello #smile')
			return
		}

		const newTags = tags.filter(tag => !hashtags.includes(tag))

		if (newTags.length === 0) {
			setError('Hashtags already added')
			return
		}

		setHashtags([...hashtags, ...newTags])
		setInputValue('')
		setError('')
	}

	const handleDeleteHashTag = (tagToDelete: string) => {
		setHashtags(prev => prev.filter(tag => tag !== tagToDelete))
	}

	const handleUploadTags = () => {
		addTagsToPhoto({
			photoId: photoId,
			tags: hashtags,
		})
		setIsAddingHashtagFormOpened(false)
	}

	const handleDeleteTagFromPhoto = (id: number) => {
		deleteTagFromPhoto({ photoId: photoId, hashtagId: id })
	}

	return (
		<Modal visible={true} transparent animationType='none'>
			<Animated.View style={styles.root}>
				<TouchableOpacity
					onPress={() => setIsAddingHashtagFormOpened(false)}
					style={styles.returnIcon}
				>
					<ReturnIcon width={30} height={30} />
				</TouchableOpacity>
				<View style={styles.top}>
					<Text style={styles.add}>Add hashtags to photo</Text>
					<Text style={styles.selected}></Text>
				</View>
				<View style={styles.content}>
					<View style={styles.inputWrapper}>
						<TextInput
							value={inputValue}
							onChangeText={setInputValue}
							placeholder='#nature #sun #forest'
							style={styles.input}
						/>
						<TouchableOpacity
							onPress={() => handleAddHashtags()}
							style={styles.addHashBtn}
						>
							<Text style={styles.addHashBtnText}>Add tag</Text>
						</TouchableOpacity>
					</View>

					{error && <Text style={styles.errorText}>{error}</Text>}

					<FlatList
						contentContainerStyle={styles.list}
						data={hashtags}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }) => (
							<View style={styles.tagWrapper}>
								<Text style={styles.tag}>{item}</Text>

								<DeleteHashtagIcon
									onPress={() => handleDeleteHashTag(item)}
									style={styles.deleteIcon}
									width={20}
									height={20}
								/>
							</View>
						)}
						horizontal
					/>
					{existingPhotoHashtags.length > 0 && (
						<View style={styles.existingHashtags}>
							<Text style={styles.existingText}>Existing photo hashtags:</Text>
							<FlatList
								contentContainerStyle={styles.list}
								data={existingPhotoHashtags}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<View style={styles.tagWrapper}>
										<Text style={styles.tag}>{item.name}</Text>

										<DeleteHashtagIcon
											onPress={() => handleDeleteTagFromPhoto(item.id)}
											style={styles.deleteIcon}
											width={20}
											height={20}
										/>
									</View>
								)}
								horizontal
							/>
						</View>
					)}
					{hashtags.length > 0 && (
						<View style={styles.uploadTagBtnWrapper}>
							<TouchableOpacity
								onPress={() => handleUploadTags()}
								style={styles.uploadTagBtn}
							>
								<Text style={styles.addHashBtnText}>Confirm</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
			</Animated.View>
		</Modal>
	)
}

export default AddHashTagsForm
