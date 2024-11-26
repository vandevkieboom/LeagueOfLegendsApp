import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchChampions, fetchHighScores, postHighScore, updateHighScore } from '@/api';
import { useHeaderContext } from '@/context/HeaderContext';
import { getCorrectGuesses, getLives, getScore, saveCorrectGuesses, saveLives, saveScore } from '@/storage';
import { Champion, HighScore } from '@/types';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import stringSimilarity from 'string-similarity';
import ChampionList from '@/components/minigamepage/GameList';
import GuessInput from '@/components/minigamepage/GuessInput';
import GameOverModal from '@/components/minigamepage/GameOverModal';

const Minigame = () => {
  const [guess, setGuess] = useState<string>('');
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [inputBorderColor, setInputBorderColor] = useState<string>('gray');
  const [playerName, setPlayerName] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { lives, setLives } = useHeaderContext();

  const {
    data: champions,
    error: championsError,
    isLoading: isLoadingChampions,
  } = useQuery<Champion[]>({
    queryKey: ['champions'],
    queryFn: fetchChampions,
  });

  const handlePostHighScoreSuccess = () => {
    handleReset();
    setIsGameOver(false);
    setIsSubmitting(false);
  };

  const postMutation = useMutation({
    mutationFn: ({ name, score }: HighScore) => postHighScore({ name, score }),
    onSuccess: handlePostHighScoreSuccess,
    onError: (error) => {
      console.error('Error posting high score:', error);
      setIsSubmitting(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id = '', name, score }: HighScore) => updateHighScore({ id, name, score }),
    onSuccess: handlePostHighScoreSuccess,
    onError: (error) => {
      console.error('Error updating high score:', error);
      setIsSubmitting(false);
    },
  });

  const handlePostHighScore = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!playerName.trim()) {
      setIsSubmitting(false);
      return;
    }

    const highScores = await fetchHighScores();
    const existingEntry = highScores.find((entry) => entry.name.toLowerCase() === playerName.toLowerCase());

    if (existingEntry && existingEntry.id) {
      if (score! > existingEntry.score) {
        updateMutation.mutate({
          id: existingEntry.id,
          name: existingEntry.name,
          score: score!,
        });
      } else {
        setIsGameOver(false);
        setIsSubmitting(false);
        return;
      }
    } else {
      postMutation.mutate({ name: playerName, score: score! });
    }
  };

  const handleCloseModal = () => {
    setIsGameOver(false);
    handleReset();
    setIsSubmitting(false);
  };

  const handleGuess = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const normalizeName = (name: string) =>
      name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .trim();
    const normalizedGuess = normalizeName(guess);
    if (champions) {
      const match = champions.find(
        (champion) => stringSimilarity.compareTwoStrings(normalizeName(champion.name), normalizedGuess) > 0.8
      );
      if (match) {
        if (!correctGuesses.map((g) => normalizeName(g)).includes(normalizeName(match.name))) {
          setCorrectGuesses((prevGuesses) => {
            const newGuesses = [...prevGuesses, match.name];
            return newGuesses;
          });
          setInputBorderColor('green');
          setScore((prevScore) => prevScore! + 1);
        } else {
          setInputBorderColor('orange');
        }
      } else {
        setInputBorderColor('red');
        setLives((prevLives) => {
          const newLives = (prevLives ?? 1) - 1;
          if (newLives <= 0) {
            handleGameOver();
            setIsSubmitting(false);
            return prevLives;
          }
          return newLives;
        });
      }
    }
    setGuess('');

    setTimeout(() => {
      setInputBorderColor('gray');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleReset = () => {
    setCorrectGuesses([]);
    setLives(3);
    setScore(0);
    setPlayerName('');
    setGuess('');
    queryClient.invalidateQueries({ queryKey: ['champions'] });
  };

  const handleGameOver = () => {
    setIsGameOver(true);
  };

  useEffect(() => {
    const loadGameData = async () => {
      const storedGuesses = await getCorrectGuesses();
      setCorrectGuesses(storedGuesses);
      const storedScore = await getScore();
      setScore(storedScore);
      const storedLives = await getLives();
      setLives(storedLives);
    };
    loadGameData();
  }, []);

  useEffect(() => {
    if (score !== null) {
      saveScore(score);
    }
  }, [score]);

  useEffect(() => {
    saveCorrectGuesses(correctGuesses);
  }, [correctGuesses]);

  useEffect(() => {
    if (lives !== null) {
      saveLives(lives);
    }
  }, [lives]);

  if (isLoadingChampions) {
    return <Loading />;
  }

  if (championsError) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <ChampionList champions={champions!} correctGuesses={correctGuesses} />
      <GuessInput
        guess={guess}
        setGuess={setGuess}
        handleGuess={handleGuess}
        handleReset={handleReset}
        inputBorderColor={inputBorderColor}
        isSubmitting={isSubmitting}
      />
      <GameOverModal
        isGameOver={isGameOver}
        playerName={playerName}
        setPlayerName={setPlayerName}
        handlePostHighScore={handlePostHighScore}
        handleCloseModal={handleCloseModal}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
});

export default Minigame;
