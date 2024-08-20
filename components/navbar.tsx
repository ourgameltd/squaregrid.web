import { useSession, signIn, signOut } from "next-auth/react";
import Conditional from "./conditional";
import { format } from "@/stringUtils";
import Link from "next/link";
import Image from "next/image"

const Navbar = ({ t }: { t: any }) => {
  const { data: session } = useSession();

  return (
    <>
      <nav className="site-nav dark js-site-navbar mb-5 site-navbar-target">
        <div className="container">
          <div className="site-navigation">
            <Link href="/" className="logo m-0 float-left">
            <Image
                        src={`/images/logo.png`}
                        alt={"Logo for squareGrid"}
                        unoptimized={true}
                        width={40}
                        height={40}
                        className="img-fluid rounded-start"
                      /> {t("navbar:appName")}
            </Link>

            <ul className="js-clone-nav d-none d-lg-inline-block site-menu float-left">
              <li>
                <Link href="/#features-section" className="nav-link">
                  Features
                </Link>
              </li>
              <Conditional condition={session != null}>
                <li className="cta-primary">
                  <Link href="/cards" title={format(t("cardsTitle"), [session?.user?.name])}>
                    {t("cards")}
                  </Link>
                </li>
              </Conditional>
            </ul>

            <Conditional condition={session != null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li>
                  <Link href="/cards" title={format(t("profileTitle"), [session?.user?.name])}>
                    {session?.user?.name} <img
                      src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                      className="rounded-circle"
                      height="25"
                      alt={format(t("profileImageAlt"), [session?.user?.name])}
                      loading="lazy"
                    />
                  </Link>
                </li>
                <li className="cta-primary">
                  <Link href="#" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: '/' }) }} title={t("signOutTitle")}>
                    {t("signOut")}
                  </Link>
                </li>
              </ul>
            </Conditional>
            <Conditional condition={session == null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li className="cta-primary">
                  <Link href="#" onClick={(e) => { e.preventDefault(); signIn("azure-ad-b2c", { callbackUrl: '/cards' }) }} title={t("signInTitle")}>
                    {t("signIn")}
                  </Link>
                </li>
              </ul>
            </Conditional>

            <Link href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none" data-toggle="collapse" data-target="#main-navbar">
              <span></span>
            </Link>
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
            <div className="dynamic-links">
              <ul className="site-nav-wrap">
                <li>
                  <Link href="/#features-section">
                    Features
                  </Link>
                </li>
                <Conditional condition={session != null}>
                  <li className="cta-primary">
                    <Link href="/cards" title={format(t("cardsTitle"), [session?.user?.name])}>
                      {t("cards")}
                    </Link>
                  </li>
                </Conditional>
                <Conditional condition={session != null}>
                  <li>
                    <Link href="/cards" title={format(t("profileTitle"), [session?.user?.name])}>
                      {session?.user?.name} <img
                        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle"
                        height="25"
                        alt={format(t("profileImageAlt"), [session?.user?.name])}
                        loading="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" onClick={(e) => { e.preventDefault(); signOut({ callbackUrl: '/' }) }} title={t("signOutTitle")}>
                      {t("signOut")}
                    </Link>
                  </li>
                </Conditional>
                <Conditional condition={session == null}>
                  <li>
                    <Link href="#" onClick={(e) => { e.preventDefault(); signIn("azure-ad-b2c", { callbackUrl: '/cards' }) }} title={t("signInTitle")}>
                      {t("signIn")}
                    </Link>
                  </li>
                </Conditional>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
