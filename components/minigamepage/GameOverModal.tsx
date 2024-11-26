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
          <Pressable onPress={handleCloseModal} style={styles.closeButton}>
            <MaterialIcons name="close" size={20} color="#fff" />
          </Pressable>
          <Text style={styles.modalTitle}>Game Over!</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              onChangeText={setPlayerName}
              placeholder="Enter username"
              placeholderTextColor="#8a8a8a"
              value={playerName}
              onSubmitEditing={handlePostHighScore}
              autoFocus
            />
            <Pressable onPress={handlePostHighScore} disabled={isSubmitting || !playerName.trim()}>
              <MaterialCommunityIcons
                name={!playerName.trim() ? 'content-save-off' : 'content-save'}
                size={34}
                color={isSubmitting || !playerName.trim() ? '#8a8a8a' : '#fff'}
              />
            </Pressable>
          </View>
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
    paddingVertical: 40,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 2,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
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
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default GameOverModal;
