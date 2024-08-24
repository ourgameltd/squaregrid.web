import { createContext } from "react";
import { BreadcrumbLink } from "../models/BreadcrumbLink";
import { User } from "../models/User";
import { AppContextModel } from "./appContextProvider";

export const appContextDefaultsInterface: AppContextModel = {
  user: {} as User,
  setUser: (value: User) => null,
  breadcrumb: [],
  setBreadcrumb: (value: BreadcrumbLink[]) => null
};

const AppContext = createContext<AppContextModel>(appContextDefaultsInterface);

export default AppContext;