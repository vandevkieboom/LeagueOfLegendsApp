import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface GuessInputProps {
  guess: string;
  setGuess: (guess: string) => void;
  handleGuess: () => void;
  handleReset: () => void;
  inputBorderColor: string;
  isSubmitting: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({
  guess,
  setGuess,
  handleGuess,
  handleReset,
  inputBorderColor,
  isSubmitting,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { borderColor: inputBorderColor }]}
        value={guess}
        onChangeText={setGuess}
        placeholder="Guess Champion"
        placeholderTextColor="#8a8a8a"
        onSubmitEditing={handleGuess}
        autoFocus
      />
      <Pressable onPress={handleGuess} style={styles.checkIcon} disabled={isSubmitting}>
        <MaterialIcons name="check" size={34} color="green" />
      </Pressable>
      <Pressable onPress={handleReset}>
        <MaterialIcons name="restart-alt" size={34} color="red" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#8a8a8a',
    borderWidth: 1,
    marginRight: 20,
    padding: 7,
    borderRadius: 2,
    color: '#8a8a8a',
  },
  checkIcon: {
    marginRight: 20,
  },
});

export default GuessInput;
