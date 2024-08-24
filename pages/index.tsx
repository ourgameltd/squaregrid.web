import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Home = () => {

  return (
    <>
      <Head>
        <title>Welcome to Square Grid</title>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-md-7 text-center mb-5">
                  <h1 className="heading">
                    Create a grid. Send a link. Pick a winner.
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="intro">
                    <div className="excerpt">
                      <span className="caption">EXPLORE THE OPTIONS.</span>
                      <h2 className="font-weight-bold">Yes, it's that easy.</h2>
                      <p>
                        No more questions, no more sharing pictures on social media, no more hassle. Simply add your options, send the link and pick a winner.
                      </p>
                    </div>
                    <p>
                      <Link href="/cards" className="btn btn-primary smoothscroll" >
                        Try Now
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="illustration shadow">
                    <img src="/images/sketch.svg" alt="Image" className="img-fluid" />
                  </div>
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

export default Home;
