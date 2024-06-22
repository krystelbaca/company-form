'use client';
import { useMyContext } from '@/app/components/Context';
import Layout from "./components/Container";
import BusinessStructure from "./components/views/BusinessStructure"; 
import ContactPerson from "./components/views/ContactPerson";
import ReviewAndSubmit from "./components/views/Review";

const Page = () => {
  const { step } = useMyContext();

  return (
    <Layout>
      {step === 1 && <BusinessStructure />}
      {step === 2 && <ContactPerson />}
      {step === 3 && <ReviewAndSubmit />}
    </Layout>
  );
};

export default Page;
