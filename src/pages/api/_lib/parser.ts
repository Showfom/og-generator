import { NextApiRequest } from "next";
import { defaultConfig } from "../../../hooks/useConfig";
import { getLayoutConfigFromQuery } from "../../../layouts";
import { IConfig, ILayoutConfig, FileType } from "../../../types";

export const parseRequest = (req: NextApiRequest): IConfig & ILayoutConfig => {
  // Filter out undefined values from query
  const query = Object.fromEntries(
    Object.entries(req.query).filter(([_, v]) => v !== undefined)
  ) as Record<string, string | string[]>;

  const config: IConfig = {
    ...defaultConfig,
    ...query,
  };

  const layoutConfig = getLayoutConfigFromQuery(config.layoutName, query);

  return {
    ...config,
    ...layoutConfig,
  };
};
