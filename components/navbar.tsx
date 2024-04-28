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
          <a href="index.html" className="logo m-0 float-left">
            {t("appName")}
            <span className="text-primary">.</span>
          </a>

          <ul className="js-clone-nav d-none d-lg-inline-block site-menu float-left">
            <li className="active">
              <a href="#home-section" className="nav-link">
                Home
              </a>
            </li>
            <li className="has-children">
              <a href="#" className="nav-link">
                Dropdown
              </a>
              <ul className="dropdown">
                <li>
                  <a href="#testimonials-section" className="nav-link">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="elements.html" className="nav-link">
                    Elements
                  </a>
                </li>
                <li className="has-children">
                  <a href="#">Menu Two</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#" className="nav-link">
                        Sub Menu One
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">
                        Sub Menu Two
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">
                        Sub Menu Three
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Menu Three
                  </a>
                </li>
              </ul>
            </li>
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
              <a href="#about-section" className="nav-link">
                About
              </a>
            </li>
            <li>
              <a href="#contact-section" className="nav-link">
                Contact
              </a>
            </li>
          </ul>

          <ul className="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right">
            <li className="cta-button-outline">
              <a href="signin.html">Sign in</a>
            </li>
            <li className="cta-primary">
              <a href="register.html">Register</a>
            </li>
          </ul>

          <a href="#" className="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none" data-toggle="collapse" data-target="#main-navbar">
            <span></span>
          </a>
        </div>
      </div>
    </nav>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <div className="container-fluid">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-mdb-toggle="collapse"
    //       data-mdb-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <i className="fas fa-bars"></i>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <Link className="navbar-brand mt-2 mt-lg-0" href="/">
    //         <img src="/images/logo.png" height="30" alt={t("logoAlt")} loading="lazy" />
    //       </Link>
    //       <Conditional condition={session != undefined}>
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //           <li className="nav-item">
    //             <a className="nav-link" href="my-teams" title={t("teamsTitle")}>
    //               {t("teams")}
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link" href="my-associations" title={t("associationsTitle")}>
    //               {t("associations")}
    //             </a>
    //           </li>
    //         </ul>
    //       </Conditional>
    //     </div>
    //     <div className="d-flex align-items-center">
    //       <Conditional condition={session != undefined}>
    //         <div className="dropdown">
    //           <a className="text-reset me-3 dropdown-toggle hidden-arrow" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //             <i className="fas fa-bell"></i>
    //             <span className="badge rounded-pill badge-notification bg-danger">1</span>
    //           </a>
    //           <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
    //             <li>
    //               <a className="dropdown-item" href="#">
    //                 Some news
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div className="dropdown">
    //           <a className="dropdown-toggle d-flex align-items-center hidden-arrow" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //             <img
    //               src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
    //               className="rounded-circle"
    //               height="25"
    //               alt={format(t("profileImageAlt"), [session?.user?.name])}
    //               loading="lazy"
    //             />
    //           </a>
    //           <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
    //             <li>
    //               <a className="dropdown-item" href="/profile" title={t("profileTitle")}>
    //                 {t("profile")}
    //               </a>
    //             </li>
    //             <li>
    //               <a className="dropdown-item" onClick={() => signOut()} title={t("signOutTitle")}>
    //                 {t("signOut")}
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //       </Conditional>
    //       <Conditional condition={!session}>
    //         <button onClick={() => signIn("azure-ad-b2c")} title={t("signInTitle")}>
    //           {t("signIn")}
    //         </button>
    //       </Conditional>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
