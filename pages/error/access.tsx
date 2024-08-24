import { GetStaticProps } from "next";
import Head from "next/head";

const ErrorAccess = () => {
  return (
    <>
      <Head>
        <title>{'Access denied.'}</title>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-md-7 text-center mb-5">
                  <h1 className="heading">
                    You are not allowed to view this page
                  </h1>
                </div>
              </div>
            </div>
          </div>
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

export default ErrorAccess;
