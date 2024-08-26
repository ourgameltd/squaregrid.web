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
        <title>Redirecting...</title>
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
