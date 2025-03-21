import { FC } from 'react'
import { SvgProps } from 'react-native-svg'
import AlbumIcon from '../../assets/images/navigation-menu/album.svg'
import HomeIcon from '../../assets/images/navigation-menu/home.svg'
import FavIcon from '../../assets/images/navigation-menu/favourite.svg'
import CreateIcon from '../../assets/images/navigation-menu/plus.svg'
import ProfileIcon from '../../assets/images/navigation-menu/profile.svg'
import { SCREENS } from '../constants/screens.constants'

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
		link: SCREENS.HOME,
	},
	{
		id: 2,
		label: 'Favourites',
		icon: FavIcon,
		link: SCREENS.FAVOURITES,
	},
	{
		id: 3,
		icon: CreateIcon,
	},
	{
		id: 4,
		label: 'Albums',
		icon: AlbumIcon,
		link: SCREENS.ALBUMS,
	},
	{
		id: 5,
		label: 'Profile',
		icon: ProfileIcon,
		link: SCREENS.PROFILE,
	},
]
