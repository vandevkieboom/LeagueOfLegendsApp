import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Champion } from '@/types';

const DetailedStats = ({ stats }: { stats: Champion['stats'] }) => {
  const calculateRange = (base: number, perLevel: number) => {
    const level1 = base;
    const level18 = base + perLevel * 17;
    return level1 === 0 && level18 === 0 ? 'N/A' : `${level1} - ${level18}`;
  };

  return (
    <View style={styles.detailedStatsContainer}>
      <ScrollView>
        <View style={styles.statRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Health</Text>
            <Text style={styles.stat}>{calculateRange(stats.hp, stats.hpperlevel)}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Health Regen</Text>
            <Text style={styles.stat}>{calculateRange(stats.hpregen, stats.hpregenperlevel)}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Mana</Text>
            <Text style={styles.stat}>{calculateRange(stats.mp, stats.mpperlevel)}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Mana Regen</Text>
            <Text style={styles.stat}>{calculateRange(stats.mpregen, stats.mpregenperlevel)}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Attack Damage</Text>
            <Text style={styles.stat}>{calculateRange(stats.attackdamage, stats.attackdamageperlevel)}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Attack Speed</Text>
            <Text style={styles.stat}>{stats.attackspeed.toFixed(3)}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Armor</Text>
            <Text style={styles.stat}>{calculateRange(stats.armor, stats.armorperlevel)}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Magic Resist</Text>
            <Text style={styles.stat}>{calculateRange(stats.spellblock, stats.spellblockperlevel)}</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Range</Text>
            <Text style={styles.stat}>{stats.attackrange}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Movement Speed</Text>
            <Text style={styles.stat}>{stats.movespeed}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailedStatsContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(15, 15, 15, 1)',
    borderColor: 'rgba(20, 20, 20, 1)',
    borderWidth: 2,
  },
  stat: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statColumn: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  statLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailedStats;
