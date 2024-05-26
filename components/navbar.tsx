import { useSession, signIn, signOut } from "next-auth/react";
import Conditional from "./conditional";
import Link from "next/link";
import { format } from "@/stringUtils";

const Navbar = ({ t }: { t: any }) => {
  const { data: session } = useSession();

  return (
    <nav className="site-nav dark js-site-navbar mb-5 site-navbar-target">
      <div className="container">
        <div className="site-navigation">
          <a href="/" className="logo m-0 float-left">
            {t("appName")}
            <span className="text-primary">.</span>
          </a>

          <ul className="js-clone-nav d-none d-lg-inline-block site-menu float-left">
            <li>
              <a href="#features-section" className="nav-link">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing-section" className="nav-link">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact-section" className="nav-link">
                Contact
              </a>
            </li>
          </ul>

          <ul className="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right">
            <Conditional condition={session != null}>
              <li>
                <a href="/profile" title={format(t("profileTitle"), [session?.user?.name])}>
                  Welcome, {session?.user?.name} <img
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
            </Conditional>
            <Conditional condition={!session}>
              <li className="cta-primary">
                <a onClick={() => signIn("azure-ad-b2c")} title={t("signInTitle")}>
                  {t("signIn")}
                </a>
              </li>
            </Conditional>
          </ul>

          <a href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none" data-toggle="collapse" data-target="#main-navbar">
            <span></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
