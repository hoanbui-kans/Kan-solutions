import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import Header from './components/Header';
import Footer from './components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Header/>
      <Component {...pageProps} />
    <Footer />
    </>
  )
  
 
}
 
export default MyApp
