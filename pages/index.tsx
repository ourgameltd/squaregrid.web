import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Home = () => {

  return (
    <>
      <Head>
        <title>Square Grid - Fundraising made easy!</title>
        <meta name="description" content="Participate in our unique grid-based game, enter the game, claim some squares and allow your network to have a winner. Perfect for fundraisers and personal challenges, and if your a charity you could win 50% of all cards bought on this website as a donation to your charity. Try your luck today!" />
        <link rel="canonical" href="https://squaregrid.org" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Square Grid - Fundraising made easy!" />
        <meta property="og:description" content="Participate in our unique grid-based game, enter the game, claim some squares and allow your network to have a winner. Perfect for fundraisers and personal challenges, and if your a charity you could win 50% of all cards bought on this website as a donation to your charity. Try your luck today!" />
        <meta property="og:url" content="https://squaregrid.org" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://squaregrid.org/images/social.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Square Grid - Fundraising made easy!" />
        <meta name="twitter:description" content="Participate in our unique grid-based game, enter the game, claim some squares and allow your network to have a winner. Perfect for fundraisers and personal challenges, and if your a charity you could win 50% of all cards bought on this website as a donation to your charity. Try your luck today!" />
        <meta name="twitter:url" content="https://squaregrid.org" />
        <meta name="twitter:image" content="https://squaregrid.org/images/social.webp" />
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="jumbotron jumbotron-fluid">
              <div className="container text-center">
                <h1 className="display-4">Fundraising. Online. Easy</h1>
                <p className="lead">For any event or team. Easy for you. Easy for them. <a href="/#win">With a chance for your charity to win big!</a>.</p>
                <p className="subtle">Lose the fear of manually managing the dreaded charity fundraising cards.</p>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="intro">
                <div className="excerpt">
                  <span className="caption">Team scratch cards!</span>
                  <h2 className="font-weight-bold">Create, Share & Win.</h2>
                  <ol className="list-unstyled">
                    <li>1. Create a card.</li>
                    <li>2. Share a link or QR and challenge your network!</li>
                    <li>3. Players claim cells and pay now or later!</li>
                    <li>4. A lucky player is chosen to win at random.</li>
                    {/* <li>5. Provide your charity number when completed.</li>
                    <li>6. Potentially win big each month.</li> */}
                  </ol>
                </div>
                <p>
                  <a href="/cards" className="btn btn-primary smoothscroll" >
                    Try Now
                  </a>
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="illustration shadow">
                <img src="/images/card.png" alt="Image" className="img-fluid" />
              </div>
            </div>
          </div>
          <div className="row justify-content-center" id="win">
            <div className="jumbotron jumbotron-fluid">
              <div className="container text-center">
                <h2 className="display-4">Coming soon: Win <span className="badge badge-warning">50%</span> of everything!</h2>
                <p className="lead">Right now this is free to use, but soon we will pledge to donate half of everything we make back to <strong>ONE</strong> lucky charity each month.</p>
              </div>
            </div>
            <div className="col-md-12 text-center mb-5">
              <h1 className="heading">
                <span className="fst-italic text-muted h5 d-block"></span>
              </h1>
              <p>
                Not only are these games fun, they're also for a good cause. We believe in giving back, so soon 50% of all funds raised through the games in each country go to charity! Here's how it works: if you're a registered charity (with a valid charity number) and you create a card, you'll be entered into a random draw. One lucky charity creator is chosen at random to receive half of the total funds raised from all the games played. This means every time you make a game, you are giving your charity a chance win big. Play knowing that every game makes a difference. All charities are verified by number to keep things fair and legit.
              </p>
            </div>
          </div>
          {/* <div className="row justify-content-center" id="win">
            <div className="jumbotron jumbotron-fluid">
              <div className="container text-center">
                <h2 className="display-4">Win <span className="badge badge-warning">50%</span> of everything!</h2>
                <p className="lead">We pledge to donate half of everything we make back to <strong>ONE</strong> lucky charity each month.</p>
              </div>
            </div>
            <div className="col-md-12 text-center mb-5">
              <h1 className="heading">
                <span className="fst-italic text-muted h5 d-block"></span>
              </h1>
              <p>
                Not only are these games fun, they're also for a good cause. We believe in giving back, so 50% of all funds raised through the games in each country go to charity! Here's how it works: if you're a registered charity (with a valid charity number) and you create a card, you'll be entered into a random draw. One lucky charity creator is chosen at random to receive half of the total funds raised from all the games played. This means every time you make a game, you are giving your charity a chance win big. Play knowing that every game makes a difference. All charities are verified by number to keep things fair and legit.
              </p>
            </div>
          </div> */}
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
