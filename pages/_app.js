import '../styles/globals.css';
import '../styles/nav.module.css';
import Navigation from '../components/container/navbar';
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';

import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import CardComponent from './card';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.pathname);
  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return (
    <div>
      {
        <>
          {router.pathname === '/admin' ? <div></div> : <Navigation />}
          <Head>
            <title>Computer Shop</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          </Head>
          < Component {...pageProps} />
        </>
      }
    </div>
  )
}

export default MyApp