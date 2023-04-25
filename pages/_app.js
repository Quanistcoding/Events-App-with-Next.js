import Layout from '@/src/layout'
import '@/styles/globals.css'
import '../styles/general.sass';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
