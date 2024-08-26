import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

const Privacy = () => {

  return (
    <>
      <Head>
        <title>Privacy Policy - Square Grid | Protecting Your Privacy</title>
        <meta name="description" content="Read Square Grid's Privacy Policy. Learn how we protect and use your information when you participate in our grid-based games. Your privacy is our priority."/>
        <link rel="canonical" href="https://squaregrid.org/privacy" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Privacy Policy - Square Grid | Secure and Transparent" />
        <meta property="og:description" content="Understand how Square Grid respects and protects your personal data. Explore our detailed Privacy Policy today." />
        <meta property="og:url" content="https://squaregrid.org/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://squaregrid.org/images/social.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy - Square Grid | Secure and Transparent" />
        <meta name="twitter:description" content="Your privacy matters at Square Grid. Discover how we handle your data with care. Read our Privacy Policy now." />
        <meta name="twitter:url" content="https://squaregrid.org/privacy"/>
        <meta name="twitter:image" content="https://squaregrid.org/images/social.webp"/>
      </Head>
      <div className="untree_co-hero pb-0" id="home-section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Privacy Policy</h1>
              <p className="text-center text-muted">Last Updated: <strong>Aug 24th 2024</strong></p>
              <p>Welcome to <strong>SquareGrid</strong> ("the Website"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you use our Website.</p>

              <h2>1. Information We Collect</h2>
              <h3>1.1. Login Information</h3>
              <p>We use Azure Active Directory B2C (Azure AD B2C) to manage the authentication process for our users. When you log in to our Website, Azure AD B2C handles your login credentials. We do not store or have access to your personal data, including your email address, password, or any other identifying information.</p>

              <h3>1.2. Game Data</h3>
              <p>The only data we collect and store are the details related to the game you create within our platform. This data is purely related to the gameplay and does not include any personal or identifiable information.</p>

              <h2>2. How We Use Your Information</h2>
              <h3>2.1. Gameplay and Service Provision</h3>
              <p>The game data you create is used solely for the purpose of facilitating gameplay and providing you with a personalized gaming experience. We do not use this data for any other purpose.</p>

              <h3>2.2. Analytics</h3>
              <p>We may use aggregated, non-identifiable data to improve our services. This data cannot be used to identify any individual user.</p>

              <h2>3. Data Security</h2>
              <p>We take reasonable measures to protect the game data stored on our servers. However, since we do not collect or store personal information, there is minimal risk of personal data exposure.</p>

              <h2>4. Third-Party Services</h2>
              <p>Our Website may contain links to third-party services or websites. Please note that we do not control, and are not responsible for, the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you interact with.</p>

              <h2>5. Cookies and Tracking Technologies</h2>
              <p>Our Website may use cookies and other tracking technologies to enhance your user experience. These cookies do not collect personal information but may collect non-identifiable data to help us improve the Website.</p>

              <h2>6. Children’s Privacy</h2>
              <p>Our Website is not intended for use by children under the age of 13. We do not knowingly collect or store any personal data from children under this age.</p>

              <h2>7. Changes to This Privacy Policy</h2>
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any changes will be posted on this page, and the date of the latest update will be indicated at the top of the policy.</p>

              <h2>8. Contact Us</h2>
              <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
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

export default Privacy;
