import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: 'ipvqhx3b',
  dataset: 'production',
  apiVersion: '2022-06-07',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

/* Creating a builder object that can be used to generate image URLs. */
const builder = imageUrlBuilder(client);

/**
 * It takes a source parameter, and returns a URL for that source
 * @param source - The name of the image file you want to transform.
 */
export const urlFor = (source) => builder.image(source);