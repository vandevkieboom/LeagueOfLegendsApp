import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Champion } from '@/types';

const DetailedStats = ({ stats }: { stats: Champion['stats'] }) => {
  const calculateRange = (base: number, perLevel: number) => {
    const level1 = base.toFixed(2);
    const level18 = (base + perLevel * 17).toFixed(2);
    return level1 === '0.00' && level18 === '0.00' ? 'N/A' : `${level1} - ${level18}`;
  };

  const statItems = [
    { label: 'Health', value: calculateRange(stats.hp, stats.hpperlevel) },
    { label: 'Health Regen', value: calculateRange(stats.hpregen, stats.hpregenperlevel) },
    { label: 'Mana', value: calculateRange(stats.mp, stats.mpperlevel) },
    { label: 'Mana Regen', value: calculateRange(stats.mpregen, stats.mpregenperlevel) },
    { label: 'Attack Damage', value: calculateRange(stats.attackdamage, stats.attackdamageperlevel) },
    { label: 'Attack Speed', value: stats.attackspeed.toFixed(2) },
    { label: 'Armor', value: calculateRange(stats.armor, stats.armorperlevel) },
    { label: 'Magic Resist', value: calculateRange(stats.spellblock, stats.spellblockperlevel) },
    { label: 'Range', value: stats.attackrange.toFixed(2) },
    { label: 'Movement Speed', value: stats.movespeed.toFixed(2) },
  ];

  return (
    <View style={styles.detailedStatsContainer}>
      <ScrollView>
        {statItems.map((item, index) => (
          <View style={styles.statRow} key={index}>
            <View style={styles.statColumn}>
              <Text style={styles.statLabel}>{item.label.toUpperCase()}</Text>
              <Text style={styles.stat}>{item.value}</Text>
            </View>
          </View>
        ))}
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
    marginBottom: 40,
  },
  stat: {
    color: '#fff',
    fontSize: 14,
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
    color: '#8a8a8a',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DetailedStats;
