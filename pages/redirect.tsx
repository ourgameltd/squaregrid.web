import { GetStaticProps } from "next";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();

  const shouldRedirect = (path: string) => {
    return path.toLowerCase().startsWith('/cards') || path.toLowerCase().startsWith('/play');
  };

  useEffect(() => {
    if (shouldRedirect(router.asPath)) {
      router.replace(router.asPath);
    }
  }, []);

  return (
    <>
      <Head>
      <title>Start Playing - Square Grid | Help our cause</title>
      <meta name="description" content="Ready to play? Click now to join our latest game at Square Grid. Whether you're playing for fun or fundraising, start your adventure here and see if you can win!"/>
      <meta name="robots" content="index, follow"/>
      <link rel="canonical" href={`https://squaregrid.org/${router.asPath}`} />
      <meta property="og:title" content="Join the Game at Square Grid - Play Now!"/>
      <meta property="og:description" content="Dive into the fun at Square Grid! Click here to start your game. Play, compete, and have a chance to win exciting prizes. Get started now!"/>
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://squaregrid.org/${router.asPath}`} />
      <meta property="og:image" content="https://squaregrid.org/images/logo.png" />
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content="Ready to Win? Play at Square Grid Now!"/>
      <meta name="twitter:description" content="Step into the game grid at Square Grid and win! Click here to play and claim your chance at exciting prizes. Join now and let the games begin!"/>
      <meta name="twitter:image" content="https://squaregrid.org/images/logo.png"/>
      <meta name="twitter:url" content={`https://squaregrid.org/${router.asPath}`} />

      </Head>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Redirecting...</span>
          </div>
          <div className="text-muted mt-2">Redirecting</div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default Redirect;
