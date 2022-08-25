/* The fact that it is inside of square brackets means that it is going to be
dynamic so for example we can go to product and then speaker or product
forward slash headphones it's going to dynamically render it */

/* that is the beauty of file based routing in xgs we didn't have
to implement any kind of library like react router we just created a new
folder with a specific file name and we can immediately start creating the jsx
and the logic for that component */
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  } 

  return (
    <div>
      { /* Checking if the image exists and if it does, it will display the image. */ }
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          {/* this is going to allow us to select an image on hover and make it visible on this bigger display that way everything is going to seem fluent and it's going to allow users to better see what products are you selling */}
         <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div> 
        </div>

       <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p> {/* number of reviews */}
              (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=> onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div> 
        </div> 
      </div>
      {/* recommended products */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div> 
    </div>
  )
}

export const getStaticPaths = async () => {
/* we're saying give me all the products but don't return all of the data for all the products just returned the current slug property */
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

 /* Creating an array of objects that have the slug property. */
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    /* The above code is telling the browser to cache the files in the cacheStorage. */
    paths,
    fallback: 'blocking'
  }
}

/* getStaticProps is a function that is used when we want to pre-render the
page at build time using the props returned 
that slug is going to be dynamic that means that we're going to get access to whatever that slack is */
export const getStaticProps = async ({ params: { slug }}) => {
/* A query that is going to get the product that matches the slug. We only want to fetch the first product that matches this query so this
is going to be used to fetch product details from the product page that we
are on */
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  /*to get the individual product */
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  console.log(product);

  return {
    props: { products, product }
  }
}

export default ProductDetails