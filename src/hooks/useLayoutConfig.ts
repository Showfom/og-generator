import { getDefaultLayout, layouts } from "../layouts";
import { useConfig } from "./useConfig";
import { useMemo } from "react";
import { ILayoutConfig } from "../types";
import useLocalStorageState from "use-local-storage-state";

const useAllLayoutConfigs = () => useLocalStorageState("layout-configs", { defaultValue: {} });

export const useLayoutConfig = (): [
  ILayoutConfig,
  (layoutConfig: ILayoutConfig) => void,
] => {
  const [{ layoutName }] = useConfig();
  const layout = useMemo(
    () => layouts.find(l => l.name === layoutName),
    [layoutName],
  );

  const defaultConfig = useMemo(
    () => (layout != null ? getDefaultLayout(layout) : {}),
    [layout],
  );

  const [allLayoutConfig, setAllLayoutConfigs] = useAllLayoutConfigs();

  const layoutConfig = allLayoutConfig[layoutName] ?? {};

  const setLayoutConfig = (config: ILayoutConfig) => {
    setAllLayoutConfigs(all => ({
      ...all,
      [layoutName]: {
        ...layoutConfig,
        ...config,
      },
    }));
  };

  return [
    {
      ...defaultConfig,
      ...layoutConfig,
    },
    setLayoutConfig,
  ];
};
