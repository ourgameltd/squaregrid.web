import { useSession, signIn, signOut } from "next-auth/react";
import Conditional from "./conditional";
import { format } from "@/stringUtils";

const Navbar = ({ t }: { t: any }) => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="site-nav dark js-site-navbar mb-5 site-navbar-target">
        <div className="container">
          <div className="site-navigation">
            <a href="/" className="logo m-0 float-left">
              {t("appName")}
            </a>

            <ul className="js-clone-nav d-none d-lg-inline-block site-menu float-left">
              <li>
                <a href="/#features-section" className="nav-link">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing-section" className="nav-link">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/#contact-section" className="nav-link">
                  Contact
                </a>
              </li>
              <Conditional condition={session != null}>
                <li className="cta-primary">
                  <a href="/account/cards" title={format(t("cardsTitle"), [session?.user?.name])}>
                    {t("cards")}
                  </a>
                </li>
              </Conditional>
            </ul>

            <Conditional condition={session != null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li>
                  <a href="/account" title={format(t("profileTitle"), [session?.user?.name])}>
                    {session?.user?.name} <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-circle"
                      height="25"
                      alt={format(t("profileImageAlt"), [session?.user?.name])}
                      loading="lazy"
                    />
                  </a>
                </li>
                <li className="cta-primary">
                  <a onClick={() => signOut()} title={t("signOutTitle")}>
                    {t("signOut")}
                  </a>
                </li>
              </ul>
            </Conditional>
            <Conditional condition={session == null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li className="cta-primary">
                  <a onClick={() => signIn("azure-ad-b2c")} title={t("signInTitle")}>
                    {t("signIn")}
                  </a>
                </li>
              </ul>
            </Conditional>

            <a href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none" data-toggle="collapse" data-target="#main-navbar">
              <span></span>
            </a>
          </div>
        </div>
      </nav>
      <div>
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close">
              <span className="icofont-close js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body">
            <div className="dynamic-links"></div>
            <ul className="site-nav-wrap">
              <Conditional condition={session != null}>
                <li>
                  <a href="/profile" title={format(t("profileTitle"), [session?.user?.name])}>
                    {session?.user?.name} <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-circle"
                      height="25"
                      alt={format(t("profileImageAlt"), [session?.user?.name])}
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a onClick={() => signOut()} title={t("signOutTitle")}>
                    {t("signOut")}
                  </a>
                </li>
              </Conditional>
              <Conditional condition={session == null}>
                <li>
                  <a onClick={() => signIn("azure-ad-b2c")} title={t("signInTitle")}>
                    {t("signIn")}
                  </a>
                </li>
              </Conditional>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
