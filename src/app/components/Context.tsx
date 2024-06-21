"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  businessName: string;
  type: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
interface MyContextProps {
  formData: FormData,
  setFormData: (formData: FormData) => void;
  step: number;
  setStep: (step: number) => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
};

const defaultFormData: FormData = {
  businessName: '',
  type: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const Context = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  return (
    <MyContext.Provider value={{ 
        formData,
        setFormData,
        step, 
        setStep,
        completedSteps, 
        setCompletedSteps
      }}>
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
