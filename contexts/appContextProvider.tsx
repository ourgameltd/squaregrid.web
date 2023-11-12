import { ReactNode, useState } from "react";
import { BreadcrumbLink } from "../models/BreadcrumbLink";
import { User } from "../models/User";
import AppContext,{ AppContextModel }  from "./appContext";

type Props = {
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

  return (
    <AppContext.Provider value={defaultValues}>
      {children}
    </AppContext.Provider>
  );
}
