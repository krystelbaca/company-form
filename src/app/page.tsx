'use client';
import { useState } from 'react';
import Layout from "./components/Container";
import BusinessStructure from "./components/views/BusinessStructure"; 
import ContactPerson from "./components/views/ContactPerson";
import ReviewAndSubmit from "./components/views/Review";
import { Context } from '@/app/components/Context';

const Page = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <Context>
      <Layout>
        {step === 1 && <BusinessStructure nextStep={nextStep} />}
        {step === 2 && <ContactPerson nextStep={nextStep} />}
        {step === 3 && <ReviewAndSubmit prevStep={prevStep} />}
      </Layout>
    </Context>
  );
};

export default Page;
