import React from 'react';
import { View, TouchableOpacity, Image, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Champion } from '@/types';

interface ChampionItemProps {
  item: Champion;
  bookmarked: boolean;
  toggleBookmark: (id: string) => void;
}

class ChampionItem extends React.PureComponent<ChampionItemProps> {
  render() {
    const { item, bookmarked, toggleBookmark } = this.props;
    return (
      <Link
        asChild
        href={{
          pathname: '/[id]',
          params: { id: item.id },
        }}
      >
        <TouchableOpacity style={styles.item} activeOpacity={0.5}>
          <Image source={{ uri: item.image.loading }} style={styles.image} />
          <Pressable style={styles.bookmarkIcon} onPress={() => toggleBookmark(item.id.toString())}>
            <MaterialIcons name={bookmarked ? 'bookmark-added' : 'bookmark-outline'} size={24} color="#fff" />
          </Pressable>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    );
  }
}

const styles = StyleSheet.create({
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

export default ChampionItem;
