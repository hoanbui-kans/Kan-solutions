import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import '../styles/globals.css'
import Layout from '../layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
 
export default MyApp