import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CloseIcon from '../../../assets/images/home/close-icon.svg';
import SearchIcon from '../../../assets/images/home/search-icon.svg';
import SortIcon from '../../../assets/images/home/sort-icon.svg';
import { IPhoto } from '../../@types/photos/photos.type';
import { useGetAllPhotos } from '../../hooks/photos/useGetAllPhotosMutation';
import { styles } from './PhotosSortPanel.styles';
import SortByName from './SortByName';
import SortByDate from './SortByDate';

interface IPhotosSortPanelProps {
  onFilter: (filteredPhotos: IPhoto[] | undefined) => void;
}

const PhotosSortPanel: React.FC<IPhotosSortPanelProps> = ({ onFilter }) => {
  const [isSortByNameOpened, setIsSortByNameOpened] = useState(false);
  const [isSortByDateOpened, setIsSortByDateOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortOrderByName, setSortOrderByName] = useState<'asc' | 'desc' | ''>(''); 
  const [selectedRange, setSelectedRange] = useState<string>('');
  const { allPhotos } = useGetAllPhotos();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showSortByNameModal = () => {
    setIsSortByNameOpened(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideSortByNameModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSortByNameOpened(false);
    });
  };

  const showSortByDateModal = () => {
    setIsSortByDateOpened(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideSortByDateModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsSortByDateOpened(false);
    });
  };

  const filterByDate = (range: string) => {
    let filteredPhotos = [];
    const today = new Date();
    const photos = allPhotos ?? [];

    switch (range) {
      case 'today':
        filteredPhotos = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate.toDateString() === today.toDateString();
        });
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filteredPhotos = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate.toDateString() === yesterday.toDateString();
        });
        break;
      case 'lastWeek':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filteredPhotos = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate >= lastWeek;
        });
        break;
      case 'last30Days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        filteredPhotos = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate >= last30Days;
        });
        break;
      default:
        filteredPhotos = photos;
    }

    setSelectedRange(range);
    onFilter(filteredPhotos)
	hideSortByDateModal()
  };

  useEffect(() => {
    let filteredPhotos = allPhotos?.filter(photo =>
      photo.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredPhotos && sortOrderByName !== '') {
      filteredPhotos = filteredPhotos.sort((a, b) =>
        sortOrderByName === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    onFilter(filteredPhotos);
  }, [searchValue, allPhotos, sortOrderByName]);

  return (
    <View>
      <View style={styles.search}>
        <TextInput
          value={searchValue}
          onChange={e => setSearchValue(e.nativeEvent.text)}
          placeholderTextColor="#61646B"
          style={styles.input}
          placeholder="Search here"
        />
        <SearchIcon width={30} height={30} style={styles.searchIcon} />
        {searchValue.length > 0 && (
          <CloseIcon
            onPress={() => setSearchValue('')}
            width={27}
            height={27}
            style={styles.closeIcon}
          />
        )}
      </View>
      <View style={styles.filterWays}>
        <TouchableOpacity onPress={showSortByNameModal} style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>Sort by name</Text>
        </TouchableOpacity>
        <SortIcon width={30} height={30} />
        <TouchableOpacity onPress={showSortByDateModal} style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>Sort by date</Text>
        </TouchableOpacity>
      </View>

      {isSortByNameOpened && (
        <SortByName
          fadeAnim={fadeAnim}
          onClose={hideSortByNameModal}
          onSort={setSortOrderByName}
          sortOrderByName={sortOrderByName}
        />
      )}
      {isSortByDateOpened && (
        <SortByDate
          fadeAnim={fadeAnim}
          onClose={hideSortByDateModal}
          allPhotos={allPhotos}
          onSort={filterByDate} 
          selectedRange={selectedRange} 
        />
      )}
    </View>
  );
};

export default PhotosSortPanel;
