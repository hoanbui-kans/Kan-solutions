import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'
import { SessionProvider } from "next-auth/react"
import Layout from '../components/Layout';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5 * 60}
        // Re-fetches session when window is focused
      refetchOnWindowFocus={true}>
    
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
 
export default MyApp