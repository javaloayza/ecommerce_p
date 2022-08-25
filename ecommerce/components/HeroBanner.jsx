import React from 'react';
import Link from 'next/link';

/* Importing the urlFor function from the client.js file in the lib folder. */
import { urlFor } from '../lib/client';

//* heroBanner comes from the index.js where it connects to the banner.js schema from Sanity and is stored in the bannerData variable */
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText}</h1>
        <img src={urlFor(heroBanner.image)} alt="banner1" className="hero-banner-image" />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 

export default HeroBanner;