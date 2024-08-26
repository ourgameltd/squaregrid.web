import Conditional from "./conditional";
import { format } from "@/stringUtils";
import Link from "next/link";
import Image from "next/image"
import React, { useEffect, useState } from "react";
import { AppContextModel } from "@/appContextProvider";
import { useRouter } from "next/router";

const Navbar = ({ context }: { context: AppContextModel }) => {
  const [imgSrc, setImgSrc] = useState(process.env.NEXT_PUBLIC_MEDIA_ENDPOINT as string);

  const router = useRouter();
  const [loginUrl, setLoginUrl] = useState('/');
  const [logoutUrl, setLogoutUrl] = useState('/');

  useEffect(() => {
    const currentUrl = window.location.href;
    setLoginUrl(`/.auth/login/b2c?post_login_redirect_uri=${encodeURIComponent(currentUrl)}`);
    setLogoutUrl(`/.auth/logout`);
  }, [router.asPath]);

  const toggleMobileNav = (e: React.FormEvent) => {
    e.preventDefault()
  };

  const redirect = (e: React.FormEvent, url: string) => {
    e.preventDefault()
    window.location.href = url;
  };
  return (
    <>
      <nav className="site-nav dark js-site-navbar mb-5 site-navbar-target">
        <div className="container">
          <div className="site-navigation">
            <Link href="/" className="logo m-0 float-left">
              <Image
                src={`/images/logo.png`}
                alt={"Logo for squareGrid"}
                width={40}
                height={40}
                unoptimized={true}
                priority={true}
                style={{height: "40px", width: "40px"}}
                className="img-fluid rounded-start"
              /> squareGrid
            </Link>

            <ul className="js-clone-nav d-none d-lg-inline-block site-menu float-left">
              <li>
                <Link href="/#features-section" className="nav-link">
                  Features
                </Link>
              </li>
              <Conditional condition={context.user != null}>
                <li className="cta-primary">
                  <Link href="/cards" title={format('View cards for {0}.', [context.user?.clientPrincipal?.userDetails])}>
                    Cards
                  </Link>
                </li>
              </Conditional>
            </ul>

            <Conditional condition={context.user != null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li>
                  <Link href="/cards" title={format('Edit profile for {0}.', [context.user?.clientPrincipal?.userDetails])}>
                    {context?.user?.clientPrincipal?.userDetails}
                    <Image
                      src={imgSrc}
                      alt={"Image for user " + context?.user?.clientPrincipal?.userDetails}
                      unoptimized={true}
                      height={25}
                      width={25}
                      priority={true}
                      style={{height: "25px", width: "auto"}}
                      className="rounded-circle ml-2"
                      onError={() => setImgSrc(process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + `/images/user/placeholder.jpg`)}
                    />
                  </Link>
                </li>
                <li className="cta-primary">
                  <a href="#" onClick={(e) => redirect(e, logoutUrl)} title="Sign out from the app.">
                    Sign out
                  </a>
                </li>
              </ul>
            </Conditional>
            <Conditional condition={context.user == null}>
              <ul className="d-none mt-1 d-lg-inline-block site-menu float-right">
                <li className="cta-primary">
                  <a href="#" onClick={(e) => redirect(e, loginUrl)} title="Sign in to the app.">
                    Sign in
                  </a>
                </li>
              </ul>
            </Conditional>

            <Link href="#" onClick={toggleMobileNav} className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none" data-toggle="collapse" data-target="#main-navbar">
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
                <Conditional condition={context.user != null}>
                  <li className="cta-primary">
                    <Link href="/cards" title={format('Vie cards for {0}.', [context?.user?.clientPrincipal?.userDetails])}>
                      Cards
                    </Link>
                  </li>
                </Conditional>
                <Conditional condition={context.user != null}>
                  <li>
                    <Link href="/cards" title={format('View profile for {0}.', [context?.user?.clientPrincipal?.userDetails])}>
                      {context?.user?.clientPrincipal?.userDetails}
                      <Image
                        src={imgSrc}
                        alt={"Image for user " + context?.user?.clientPrincipal?.userDetails}
                        unoptimized={true}
                        height={25}
                        width={25}
                        priority={true}
                        style={{height: "25px", width: "auto"}}
                        className="rounded-circle ml-2"
                        onError={() => setImgSrc(process.env.NEXT_PUBLIC_MEDIA_ENDPOINT + `/images/user/placeholder.jpg`)}
                      />
                    </Link>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => redirect(e, logoutUrl)} title="Sign out of the app.">
                      Sign out
                    </a>
                  </li>
                </Conditional>
                <Conditional condition={context.user == null}>
                  <li>
                    <a href="#" onClick={(e) => redirect(e, loginUrl)} title="Sign in to the app.">
                      Sign in
                    </a>
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
