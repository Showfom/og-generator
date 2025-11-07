import useLocalStorageState from "use-local-storage-state";
import { layouts } from "../layouts";
import { IConfig } from "../types";

export const defaultConfig: IConfig = {
  fileType: "png",
  layoutName: layouts[0].name,
};

export const useConfig = () => useLocalStorageState<IConfig>(
  "config",
  { defaultValue: defaultConfig },
);
