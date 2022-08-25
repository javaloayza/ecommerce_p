import React from 'react';
/* head head is the same thing as head is in html that head element that appears above the body that
gives you some metadata about your website in nextgs you just have to import it like this inside of the layout what we can do is
render out a div and that div is going to have a class name right here equal to layout */
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
/* well a special trick in react is whatever you pass to inside of your
component you get access to that through a prop called children */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Pinn Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout