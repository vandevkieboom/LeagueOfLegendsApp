import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchChampions, fetchHighScores } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Champion, HighScore } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

const Leaderboard = () => {
  const { data: champions } = useQuery<Champion[]>({
    queryKey: ['champions'],
    queryFn: fetchChampions,
  });

  const {
    data: highScores,
    isLoading: highScoresLoading,
    error: highScoresError,
  } = useQuery<HighScore[]>({
    queryKey: ['highScores'],
    queryFn: fetchHighScores,
  });

  const sortedHighScores = highScores?.sort((a, b) => b.score - a.score);

  if (highScoresLoading) {
    return <Loading />;
  }

  if (highScoresError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leaderboard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>NAME</Text>
          <Text style={styles.tableHeaderText}>SCORE</Text>
        </View>
        <ScrollView>
          {sortedHighScores?.map((item, index) => (
            <View key={index.toString()} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>
                {item.score} / {champions?.length}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
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
  leaderboard: {
    flex: 1,
    borderRadius: 0,
    marginBottom: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 7,
  },
  tableHeaderText: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 7,
    borderRadius: 100,
  },
  evenRow: {
    backgroundColor: 'rgba(34, 34, 34, 1)',
  },
  oddRow: {
    backgroundColor: 'rgba(34, 34, 34, 0.7)',
  },
  tableCell: {
    flex: 1,
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default Leaderboard;
