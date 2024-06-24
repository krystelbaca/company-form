'use client';
import { 
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode 
} from 'react';

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
  const [formData, setFormData] = useState<FormData>(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : defaultFormData;
  });

  const [step, setStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('step');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

    const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const savedCompletedSteps = localStorage.getItem('completedSteps');
    return savedCompletedSteps ? JSON.parse(savedCompletedSteps) : [];
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('step', step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const nextStep = () => {
    setCompletedSteps((prev) => [...new Set([...prev, step])]);
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
