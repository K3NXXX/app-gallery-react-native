import { FC } from 'react'
import { SvgProps } from 'react-native-svg'
import AlbumIcon from '../../assets/images/navigation-menu/album.svg'
import HomeIcon from '../../assets/images/navigation-menu/home.svg'
import PhotoIcon from '../../assets/images/navigation-menu/photo.svg'
import CreateIcon from '../../assets/images/navigation-menu/plus.svg'
import ProfileIcon from '../../assets/images/navigation-menu/profile.svg'

interface IMenuItem {
	id: number
	label?: string
	icon: FC<SvgProps>
	link?: string
}

export const menuList: IMenuItem[] = [
	{
		id: 1,
		label: 'Home',
		icon: HomeIcon,
		link: '',
	},
	{
		id: 2,
		label: 'Photos',
		icon: PhotoIcon,
		link: '',
	},
	{
		id: 3,
		icon: CreateIcon,
	},
	{
		id: 4,
		label: 'Albums',
		icon: AlbumIcon,
		link: '',
	},
	{
		id: 5,
		label: 'Profile',
		icon: ProfileIcon,
		link: '',
	},
]
