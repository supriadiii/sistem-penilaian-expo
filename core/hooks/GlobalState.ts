import { GlobalStore } from "react-native-global-state-hooks";

// initialize your store with the default value of the same.
const tokenStore = new GlobalStore<string | undefined>("");
const userStore = new GlobalStore<any | undefined>("");

// get the hook
export const useExpoTokenGlobal = tokenStore.getHook();
export const useExpoUserGlobal = userStore.getHook();
