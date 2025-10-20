import React from "react";
import rootStore from "../stores/rootStore";

export const RootStoreContext = React.createContext(rootStore);
export const useRootStore = () => React.useContext(RootStoreContext);