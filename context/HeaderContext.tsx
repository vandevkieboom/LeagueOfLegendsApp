import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HeaderContextProps {
  searchBarVisible: boolean;
  setSearchBarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sortModalVisible: boolean;
  setSortModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  filterModalVisible: boolean;
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  lives: number | null;
  setLives: React.Dispatch<React.SetStateAction<number | null>>;
}

interface HeaderProviderProps {
  children: ReactNode;
}

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }
  return context;
};

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [searchBarVisible, setSearchBarVisible] = useState<boolean>(false);
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false);
  const [filterModalVisible, setFilterModalVisible] = useState<boolean>(false);
  const [lives, setLives] = useState<number | null>(null);

  return (
    <HeaderContext.Provider
      value={{
        searchBarVisible,
        setSearchBarVisible,
        sortModalVisible,
        setSortModalVisible,
        filterModalVisible,
        setFilterModalVisible,
        lives,
        setLives,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
