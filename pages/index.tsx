import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Home = () => {

  return (
    <>
      <Head>
        <title>Be a winner on with Square Grid - Join Our Grid-Based Draws!</title>
        <meta name="description" content="Experience the thrill of Square Grid! Participate in our unique grid-based games, enter draws, and win the card. Perfect for fundraisers and personal challenges. Try your luck today!" />
        <link rel="canonical" href="https://squaregrid.org" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Win Big with Square Grid - Join Our Grid-Based Game Draws!" />
        <meta property="og:description" content="Participate in Square Grid for a chance to win exciting prizes! Dive into our grid-based draws and make your day a winning one. Great for fundraisers and thrilling competitions." />
        <meta property="og:url" content="https://squaregrid.org" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://squaregrid.org/images/logo.png" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Win Big with Square Grid - Join Our Grid-Based Game Draws!"/>
        <meta name="twitter:description" content="Join the fun at Square Grid and win! Our grid-based games offer excitement and the thrill of winning. Don’t miss out—play now and be a winner!"/>
        <meta name="twitter:url" content="https://squaregrid.org"/>
        <meta name="twitter:image" content="https://squaregrid.org/images/logo.png"/>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-md-7 text-center mb-5">
                  <h1 className="heading">
                    Welcome to Square Grid <span className="fst-italic text-muted h5 d-block">Create and play grid-based draw games</span>
                  </h1>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="intro">
                    <div className="excerpt">
                      <span className="caption">How it works?</span>
                      <h2 className="font-weight-bold">Create a grid. Send a link. Pick a winner.</h2>
                      <p>
                        No more questions, no more sharing pictures on social media, no more hassle. Simply add your options, send the link and pick a winner.
                      </p>
                    </div>
                    <p>
                      <a href="/cards" className="btn btn-primary smoothscroll" >
                        Try Now
                      </a>
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
