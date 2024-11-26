import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => (
  <TextInput
    placeholder="Search Champion"
    placeholderTextColor="#8a8a8a"
    onChangeText={setSearch}
    value={search}
    style={styles.textInput}
    autoFocus
  />
);

const styles = StyleSheet.create({
  textInput: {
    borderColor: '#8a8a8a',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 12,
    marginHorizontal: 5,
    padding: 7,
    color: '#fff',
  },
});

export default SearchBar;
