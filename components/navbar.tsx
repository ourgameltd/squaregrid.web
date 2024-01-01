import { useSession, signIn, signOut } from "next-auth/react";
import Conditional from "./conditional";
import Link from "next/link";
import { format } from "@/stringUtils";

const Navbar = ({ t }: { t: any }) => {
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="navbar-brand mt-2 mt-lg-0" href="/">
            <img src="/images/logo.png" height="30" alt={t("logoAlt")} loading="lazy" />
          </Link>
          <Conditional condition={session != undefined}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="my-teams" title={t("teamsTitle")}>
                  {t("teams")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="my-associations" title={t("associationsTitle")}>
                  {t("associations")}
                </a>
              </li>
            </ul>
          </Conditional>
        </div>
        <div className="d-flex align-items-center">
          <Conditional condition={session != undefined}>
            <div className="dropdown">
              <a className="text-reset me-3 dropdown-toggle hidden-arrow" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fas fa-bell"></i>
                <span className="badge rounded-pill badge-notification bg-danger">1</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <a className="dropdown-item" href="#">
                    Some news
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <a className="dropdown-toggle d-flex align-items-center hidden-arrow" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt={format(t("profileImageAlt"), [session?.user?.name])}
                  loading="lazy"
                />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                <li>
                  <a className="dropdown-item" href="/profile" title={t("profileTitle")}>
                    {t("profile")}
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={() => signOut()} title={t("signOutTitle")}>
                    {t("signOut")}
                  </a>
                </li>
              </ul>
            </div>
          </Conditional>
          <Conditional condition={!session}>
            <button onClick={() => signIn("azure-ad-b2c")} title={t("signInTitle")}>
              {t("signIn")}
            </button>
          </Conditional>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
