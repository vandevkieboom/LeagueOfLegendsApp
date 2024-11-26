import React from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Champion } from '@/types';

interface ChampionListProps {
  champions: Champion[];
  correctGuesses: string[];
}

const ChampionList = ({ champions, correctGuesses }: ChampionListProps) => {
  const sortedChampions = (champions || []).slice().sort((a, b) => {
    const aGuessed = correctGuesses.some((guess) => guess.toLowerCase() === a.name.toLowerCase());
    const bGuessed = correctGuesses.some((guess) => guess.toLowerCase() === b.name.toLowerCase());
    return aGuessed === bGuessed ? 0 : aGuessed ? -1 : 1;
  });

  return (
    <FlatList
      data={sortedChampions}
      keyExtractor={(item) => item.id.toString()}
      numColumns={5}
      renderItem={({ item }) => {
        const isGuessed = correctGuesses.some((guess) => guess.toLowerCase() === item.name.toLowerCase());

        return (
          <View style={styles.item}>
            <Image source={{ uri: item.image.loading }} style={styles.image} />
            {isGuessed && (
              <View style={styles.overlay}>
                <MaterialIcons name="check" size={34} color="white" />
              </View>
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 2,
    height: 114,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(68, 178, 69, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChampionList;
