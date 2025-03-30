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
  const [filteredPhotos, setFilteredPhotos] = useState<IPhoto[]>([]);
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
    let filtered = [];
    const today = new Date();
    const photos = allPhotos ?? [];

    switch (range) {
      case 'today':
        filtered = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate.toDateString() === today.toDateString();
        });
        break;
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filtered = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate.toDateString() === yesterday.toDateString();
        });
        break;
      case 'lastWeek':
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        filtered = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate >= lastWeek;
        });
        break;
      case 'last30Days':
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        filtered = photos.filter(photo => {
          const photoDate = new Date(photo.createdAt);
          return photoDate >= last30Days;
        });
        break;
      default:
        filtered = photos;
    }

    setSelectedRange(range);
    setFilteredPhotos(filtered);
    hideSortByDateModal();
  };

  useEffect(() => {
    if (!selectedRange && !sortOrderByName && !searchValue) {
      setFilteredPhotos(allPhotos ?? []);
    }
  }, [allPhotos, selectedRange, sortOrderByName, searchValue]);

  useEffect(() => {
    let filtered = filteredPhotos.filter(photo =>
      photo.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filtered && sortOrderByName !== '') {
      filtered = filtered.sort((a, b) =>
        sortOrderByName === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }

    onFilter(filtered);
  }, [searchValue, filteredPhotos, sortOrderByName]);

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
