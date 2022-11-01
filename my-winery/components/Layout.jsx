import React from 'react';
// Import the head element the same thing as HTML
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

//Whenever you pass inside of your component you get access to it through childen ( _app.js)

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Luis Trueba Winery Store</title>
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