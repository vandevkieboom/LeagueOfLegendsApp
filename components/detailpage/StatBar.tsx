import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatBar = ({
  label,
  value,
  maxValue,
  color,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}) => {
  const barWidth = (value / maxValue) * 100;
  return (
    <View style={styles.statBarContainer}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBarBackground}>
        <View style={[styles.statBarFill, { width: `${barWidth}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statBarContainer: {
    marginBottom: 10,
  },
  statLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  statBarBackground: {
    height: 10,
    backgroundColor: '#8a8a8a',
    borderRadius: 5,
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
  },
});

export default StatBar;
