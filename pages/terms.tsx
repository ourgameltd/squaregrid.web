import { GetStaticProps } from "next";
import Head from "next/head";

const Terms = () => {

  return (
    <>
      <Head>
        <title>Terms and Conditions - Square Grid | Game Rules and Regulations</title>
        <meta name="description" content="View the Terms and Conditions for Square Grid. Understand the rules and your rights before participating in our grid-based games."/>
        <link rel="canonical" href="https://squaregrid.org/terms" />
        <meta name="robots" content="noindex, follow"/>
        <meta property="og:title" content="Terms and Conditions - Square Grid | Understand Your Rights"/>
        <meta property="og:description" content="Familiarize yourself with the Terms and Conditions of Square Grid to ensure a fair and enjoyable game experience."/>
        <meta property="og:url" content="https://squaregrid.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://squaregrid.org/images/social.webp" />
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title" content="Terms and Conditions - Square Grid | Understand Your Rights"/>
        <meta name="twitter:description" content="Get all the details on the rules and your rights at Square Grid. Check out our Terms and Conditions today."/>
        <meta name="twitter:url" content="https://squaregrid.org/terms"/>
        <meta name="twitter:image" content="https://squaregrid.org/images/social.webp"/>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Terms and Conditions</h1>
              <p className="text-center text-muted">Last Updated: <strong>Aug 24th 2024</strong></p>
              <p>Welcome to <strong>SquareGrid</strong> ("the Website"). These Terms and Conditions ("Terms") govern your use of our Website and the services provided therein. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Website.</p>

              <h2>1. Use of the Website</h2>
              <p>You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the Website.</p>

              <h2>2. User Accounts</h2>
              <p>To access certain features of the Website, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You must notify us immediately if you suspect any unauthorized use of your account.</p>

              <h2>3. Intellectual Property</h2>
              <p>All content on the Website, including but not limited to text, graphics, logos, and software, is the property of <strong>SquareGrid</strong> or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works of any content on the Website without our prior written consent.</p>

              <h2>4. Limitation of Liability</h2>
              <p>We do not guarantee that the Website will be secure or free from bugs or viruses. You are responsible for configuring your information technology, computer programs, and platform to access the Website. To the extent permitted by law, we exclude all liability for any loss or damage arising from your use of the Website.</p>

              <h2>5. Links to Third-Party Websites</h2>
              <p>The Website may contain links to third-party websites that are not owned or controlled by <strong>SquareGrid</strong>. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that we are not responsible for any damages or losses caused by your use of any third-party website.</p>

              <h2>6. Changes to These Terms</h2>
              <p>We may update these Terms from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the date of the latest update will be indicated at the top of the Terms.</p>

              <h2>7. Governing Law</h2>
              <p>These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in [Your Jurisdiction] for the resolution of any disputes arising out of or relating to these Terms or your use of the Website.</p>

              <h2>8. Contact Us</h2>
              <p>If you have any questions or concerns about these Terms, please contact us at:</p>
              <p><strong>TBC</strong></p>
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

export default Terms;
