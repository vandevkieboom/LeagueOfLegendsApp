import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchChampions } from '@/api';
import { Champion, Tag } from '@/types';
import { getBookmarkedChampions, saveBookmarkedChampions } from '@/storage';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import SearchBar from '@/components/homepage/SearchBar';
import ChampionItem from '@/components/homepage/ChampionItem';
import { useHeaderContext } from '@/context/HeaderContext';
import OptionsModal from '@/components/homepage/OptionsModal';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [sortOption, setSortOption] = useState<string>('name');
  const [filterOption, setFilterOption] = useState<string[]>([]);
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});

  const { searchBarVisible, sortModalVisible, setSortModalVisible, filterModalVisible, setFilterModalVisible } =
    useHeaderContext();

  const {
    data: champions,
    error: championsError,
    isLoading: isLoadingChampions,
  } = useQuery<Champion[]>({
    queryKey: ['champions'],
    queryFn: fetchChampions,
  });

  useEffect(() => {
    const loadBookmarkedChampions = async () => {
      const storedBookmarked = await getBookmarkedChampions();
      setBookmarked(storedBookmarked);
    };
    loadBookmarkedChampions();
  }, []);

  useEffect(() => {
    if (champions) {
      let updatedChampions = [...champions];
      if (search) {
        updatedChampions = updatedChampions.filter((champion) =>
          champion.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (filterOption.length > 0) {
        updatedChampions = updatedChampions.filter((champion) =>
          filterOption.some((tag) => champion.tags.includes(tag as Tag))
        );
      }
      if (sortOption === 'name') {
        updatedChampions.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === 'difficulty') {
        updatedChampions.sort((a, b) => a.info.difficulty - b.info.difficulty);
      } else if (sortOption === 'favorites') {
        updatedChampions.sort((a, b) => {
          const aBookmarked = bookmarked[a.id] ? 1 : 0;
          const bBookmarked = bookmarked[b.id] ? 1 : 0;
          return bBookmarked - aBookmarked;
        });
      }
      setFilteredChampions(updatedChampions);
    }
  }, [champions, search, sortOption, filterOption, bookmarked]);

  const toggleBookmark = async (id: string) => {
    const updatedBookmarked = { ...bookmarked, [id]: !bookmarked[id] };
    setBookmarked(updatedBookmarked);
    await saveBookmarkedChampions(updatedBookmarked);
  };

  const handleSort = (option: string) => {
    setSortOption(option);
    setSortModalVisible(false);
  };

  const handleFilter = (tag: string) => {
    let updatedFilterOption = [tag];
    if (filterOption.includes(tag)) {
      updatedFilterOption = [];
    }
    setFilterOption(updatedFilterOption);
    setFilterModalVisible(false);
  };

  if (isLoadingChampions) {
    return <Loading />;
  }

  if (championsError) {
    return <Error />;
  }

  return (
    <>
      <View style={styles.container}>
        {searchBarVisible && <SearchBar search={search} setSearch={setSearch} />}
        <FlatList
          data={filteredChampions}
          key={`columns-${3}`}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <ChampionItem item={item} bookmarked={bookmarked[item.id]} toggleBookmark={toggleBookmark} />
          )}
        />
      </View>

      <OptionsModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
        onSelect={handleSort}
        selectedOption={sortOption}
        options={['name', 'difficulty', 'favorites']}
        title="Sort Champions"
      />

      <OptionsModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onSelect={handleFilter}
        selectedOption={filterOption[0]}
        options={['Assassin', 'Fighter', 'Mage', 'Marksman', 'Support', 'Tank']}
        title="Filter Champions"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 12,
    marginHorizontal: 5,
    padding: 7,
    color: 'white',
  },
  item: {
    flex: 1,
    margin: 2,
    height: 197,
    maxWidth: '32%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  nameContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  nameText: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
    overflow: 'hidden',
  },
});

export default Home;
