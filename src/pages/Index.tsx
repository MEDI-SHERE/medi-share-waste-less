import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Categories from '@/components/home/Categories';
import Stats from '@/components/home/Stats';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Medi-Share - Buy & Sell Unused Medicines at Half Price</title>
        <meta
          name="description"
          content="Connect with people in your city to buy and sell unused BP, diabetes, cancer medicines at 50% off. Reduce medicine waste and make healthcare affordable."
        />
      </Helmet>
      <Layout>
        <Hero />
        <HowItWorks />
        <Categories />
        <Stats />
      </Layout>
    </>
  );
}
