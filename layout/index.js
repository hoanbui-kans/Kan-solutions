import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NextNProgress from 'nextjs-progressbar';

const Layout = ({ children }) => {
    return (
        <>
        <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
        <Header />
          {
              <main>
                {children}
              </main>
          }
        <Footer />
    </>
  )
}

export default Layout