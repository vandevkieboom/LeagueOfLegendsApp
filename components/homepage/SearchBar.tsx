import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => (
  <TextInput
    placeholder="Search Champion"
    placeholderTextColor="gray"
    onChangeText={setSearch}
    value={search}
    style={styles.textInput}
  />
);

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 12,
    marginHorizontal: 5,
    padding: 7,
    color: 'white',
  },
});

export default SearchBar;
