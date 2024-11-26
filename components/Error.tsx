import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = () => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>An error occurred while loading the data.</Text>
  </View>
);

const styles = StyleSheet.create({
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
});

export default Error;
