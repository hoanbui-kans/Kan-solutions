import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';
import Router from 'next/router';
import Loading from './components/Loading';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  })
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });
  return (
    <>
    <Header/>
        { 
        loading ? 
            <Loading /> :  <Component {...pageProps} />
        }
     
    <Footer />
    </>
  )
  
 
}
 
export default MyApp
