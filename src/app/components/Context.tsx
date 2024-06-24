'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { companyTypes } from '../../data/companyTypes';
import { states } from '../../data/states'
import { countries } from '../../data/countries';
import { State, CompanyType, Country } from '../../types/index';

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
  country: string;
  phone: string;
};
interface MyContextProps {
  formData: FormData,
  setFormData: (formData: FormData) => void;
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  completedSteps: number[];
  setCompletedSteps: (steps: number[]) => void;
  states: State[];
  companyTypes: string[];
  countries: Country[];
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
  country: '',
  phone: '',
};

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const Context = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <MyContext.Provider value={{ 
        formData,
        setFormData,
        step, 
        setStep,
        nextStep,
        prevStep,
        completedSteps, 
        setCompletedSteps,
        states,
        companyTypes,
        countries
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
