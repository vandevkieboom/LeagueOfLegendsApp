import React from 'react';
import { View, Text, TextInput, Pressable, Modal, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

interface GameOverModalProps {
  isGameOver: boolean;
  playerName: string;
  setPlayerName: (name: string) => void;
  handlePostHighScore: () => void;
  handleCloseModal: () => void;
  isSubmitting: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isGameOver,
  playerName,
  setPlayerName,
  handlePostHighScore,
  handleCloseModal,
  isSubmitting,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isGameOver}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Game Over!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              onChangeText={setPlayerName}
              placeholder="Enter username"
              placeholderTextColor="gray"
              value={playerName}
              onSubmitEditing={handlePostHighScore}
            />
            <Pressable onPress={handlePostHighScore} disabled={isSubmitting || !playerName.trim()}>
              <MaterialCommunityIcons
                name={!playerName.trim() ? 'content-save-off' : 'content-save'}
                size={34}
                color={isSubmitting || !playerName.trim() ? 'gray' : 'white'}
              />
            </Pressable>
          </View>
          <Pressable onPress={handleCloseModal}>
            <MaterialIcons name="close" size={34} color="white" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#000',
    opacity: 0.9,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 2,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 20,
    padding: 7,
    borderRadius: 2,
    color: 'gray',
  },
});

export default GameOverModal;
