import { ReactNode, useEffect, useState } from "react";
import { BreadcrumbLink } from "../models/BreadcrumbLink";
import { User } from "../models/User";
import AppContext  from "./appContext";

export interface AppContextModel {
  user?: User;
  setUser: (value: User) => void;
  breadcrumb: BreadcrumbLink[];
  setBreadcrumb: (value: BreadcrumbLink[]) => void;
};

export type Props = {
  children: ReactNode;
};

export default function AppContextProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [breadcrumb, setBreadcrumb] = useState<Array<BreadcrumbLink>>();

  const defaultValues = {
    user: user,
    setUser: setUser,
    breadcrumb: breadcrumb,
    setBreadcrumb: setBreadcrumb
  } as AppContextModel;

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch("/.auth/me");
      if (response.ok) {
        const userInfo = await response.json() as User;
        if (userInfo.clientPrincipal) {
          setUser(userInfo);
        }
      }
    }
    fetchUser();
  }, []);
  
  return (
    <AppContext.Provider value={defaultValues}>
      {children}
    </AppContext.Provider>
  );
}
