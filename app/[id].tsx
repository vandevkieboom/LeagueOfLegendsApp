import { fetchChampionById } from '@/api';
import { Champion } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import DetailedStats from '@/components/detailpage/DetailedStats';
import StatBar from '@/components/detailpage/StatBar';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const ChampionDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: champion,
    error: championError,
    isLoading: isLoadingChampion,
  } = useQuery<Champion>({
    queryKey: ['champion', id],
    queryFn: () => fetchChampionById(id),
  });

  if (isLoadingChampion) {
    return <Loading />;
  }

  if (championError) {
    return <Error />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: champion?.image.full }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{champion?.name}</Text>
          <Text style={styles.title}>{champion?.title}</Text>
          <Text style={styles.tags}>{champion?.tags.join(', ')}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <StatBar label="Attack" value={champion?.info.attack ?? 0} maxValue={10} color="red" />
        <StatBar label="Defense" value={champion?.info.defense ?? 0} maxValue={10} color="green" />
        <StatBar label="Magic" value={champion?.info.magic ?? 0} maxValue={10} color="blue" />
        <StatBar label="Difficulty" value={champion?.info.difficulty ?? 0} maxValue={10} color="purple" />
      </View>
      {champion?.stats && <DetailedStats stats={champion.stats} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'rgba(15, 15, 15, 1)',
    borderRadius: 8,
    borderColor: 'rgba(20, 20, 20, 1)',
    borderWidth: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderColor: '#C89B3C',
    borderWidth: 1,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: '#8a8a8a',
    fontSize: 17,
  },
  tags: {
    color: '#fff',
    fontSize: 17,
    fontStyle: 'italic',
  },
  statsContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(15, 15, 15, 1)',
    borderColor: 'rgba(20, 20, 20, 1)',
    borderWidth: 2,
  },
});

export default ChampionDetail;
