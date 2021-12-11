import * as allConfig from "../config"

const config = (path = "") => {
  if (!path) return allConfig;

  const splittedPath = path.split(".");

  if (splittedPath.length === 1) return allConfig[splittedPath];

  let currentPath;

  let configValue;

  splittedPath.every((val) => {
    currentPath = val;

    if (!configValue) {
      configValue = allConfig;
    }

    if (!configValue[currentPath]) {
      configValue = undefined;
      return false;
    }

    configValue = configValue[currentPath];

    return true;
  });

  return configValue;
};

export default config;
