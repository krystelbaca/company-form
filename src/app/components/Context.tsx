"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface MyContextProps {
  value: string;
  setValue: (value: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const Context = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string>('');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a Context');
  }
  return context;
};
