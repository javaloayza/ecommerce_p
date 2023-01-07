import React, { useEffect } from 'react';
// import 'tw-elements';
//import dynamic from 'next/dynamic';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, Slider } from '../components';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
import("../node_modules/tw-elements/dist/js/index.min.js")
}
/* const Element = dynamic(
  () => {
    return import("tw-elements").then((mod) => mod.controlled);
  },
  { ssr: false }  
) */
const Home = ({ products, bannerData }) => (

      <div>
      {/* <Script src="./node_modules/tw-elements/dist/js/index.min.js" /> */}
      <Slider />  
{/*       <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
 */}      {/* {console.log(bannerData)}; */}

      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>speaker There are many variations passages</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  
);

export const getServerSideProps = async () => {
  /* A query to the Sanity database. */
  const query = '*[_type == "product"]';
  /* Fetching the data from the Sanity database. */
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
} 

export default Home;
