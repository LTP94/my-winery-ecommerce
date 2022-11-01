import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';



const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className="products-heading">
      <h2>Best Wines Around The Globe</h2>
      <p>The wine of Love is music,
        And the feast of Love is song</p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>
    <FooterBanner footerBanner={bannerData && bannerData[0]} />

  </div>
);

// getServerSideProps only runs on server-side and never runs on the browser. -- Next.js will pre-render this page on each request using the data returned by getServerSideProps.


export const getServerSideProps = async () => {

  // add queries to get information from sanity -- product first

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;
