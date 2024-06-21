import Layout from "./components/Container";
// import BusinessStructure from "./components/views/BusinessStructure"; 
import ContactPerson from "./components/views/ContactoPerson";
import { Context } from '@/app/components/Context'

export default function Page() {
  return (
    <Context>
      <Layout>
        <ContactPerson />
      </Layout>
    </Context>
  );
};