'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AuthProvider');
  }
  return context;
};

type AppContextType = {
  favouritePostsNumber: number;
  incrementFavouritePostsNumber: () => void;
  setFavouritePostsNumberHandler: (value: number) => void;
};

const DEFAULT_NUMBER_OF_FAV_POSTS = 0;
const INCREMENT_VALUE = 1;

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [favouritePostsNumber, setFavouritePostsNumber] = useState<number>(DEFAULT_NUMBER_OF_FAV_POSTS);

  const incrementFavouritePostsNumber = () => {
    setFavouritePostsNumber(favouritePostsNumber + INCREMENT_VALUE);
  };

  const setFavouritePostsNumberHandler = (value: number) => {
    setFavouritePostsNumber(value);
  };

  return (
    <AppContext.Provider
      value={{
        favouritePostsNumber,
        incrementFavouritePostsNumber,
        setFavouritePostsNumberHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
